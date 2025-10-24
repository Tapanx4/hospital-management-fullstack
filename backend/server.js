require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8080;

// --- Middleware ---
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(bodyParser.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => {
    console.error('MongoDB Connection Error:', err);
});

// --- Mongoose Schemas ---

// User Schema (Unchanged)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        required: true
    }
}, { timestamps: true }); // <-- This line enables createdAt and updatedAt
const User = mongoose.model('User', userSchema);

// Appointment Schema (Unchanged)
const appointmentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    date: Date,
    time: String,
    doctor: String, // This will store the doctor's username
    reason: String,
    area: String,
    state: String,
    city: String,
    postalCode: String,
    patientUsername: { type: String, required: true }
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Doctor Profile Schema (Unchanged)
const doctorProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    username: { type: String, required: true, unique: true }, 
    displayName: { type: String, required: true },
    specialty: { type: String, required: true },
    bio: { type: String, default: 'This doctor has not added a bio yet.' }
});
const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema);
const contactMessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);


// --- Auth Middleware ---

// Standard 'protect' middleware (Unchanged)
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user; 
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Admin-only 'adminProtect' middleware (Unchanged)
const adminProtect = (req, res, next) => {
    protect(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Not authorized. Admin access only.' });
        }
    });
};


// --- API Routes ---
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' });
        }
        const newMessage = new ContactMessage({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully. We will get back to you soon.' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// == Authentication Routes ==
// POST /api/auth/register (Now Admin Protected)
// This route is now only for creating Admin users.
app.post('/api/auth/register', adminProtect, async (req, res) => {
    const { username, password, role } = req.body;

    // Only allow admin to create other admins
    if (role !== 'admin') {
        return res.status(400).json({ message: 'This route is only for creating admins. Use /api/admin/create-doctor for doctors.' });
    }

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({ username, password, role: 'admin' });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ message: `Admin user '${username}' registered successfully` });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// POST /api/auth/register-patient (Unchanged)
app.post('/api/auth/register-patient', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Patient username already exists' });
        }
        user = new User({ username, password, role: 'patient' });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// POST /api/auth/login (Unchanged)
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const payload = {
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: payload.user });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// PUT /api/appointments/:id (Reschedule Appointment - Patient Protected)
app.put('/api/appointments/:id', protect, async (req, res) => {
    const { date, time } = req.body;
    const appointmentId = req.params.id;
    const loggedInUsername = req.user.username; // Username from token

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // --- Authorization Check ---
        if (appointment.patientUsername !== loggedInUsername) {
            return res.status(403).json({ message: 'Not authorized to modify this appointment' });
        }

        // --- No status check needed now ---

        if (!date || !time) {
             return res.status(400).json({ message: 'New date and time are required.' });
        }
        // Add more validation logic here if needed

        // Update the appointment
        appointment.date = date;
        appointment.time = time;

        await appointment.save();

        res.json({ message: 'Appointment rescheduled successfully', appointment });

    } catch (error) {
        console.error('Error rescheduling appointment:', error);
        if (error.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid appointment ID format' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});


// DELETE /api/appointments/:id (Cancel Appointment - Patient Protected)
// *** UPDATED: Now performs actual deletion ***
app.delete('/api/appointments/:id', protect, async (req, res) => {
    const appointmentId = req.params.id;
    const loggedInUsername = req.user.username; // Username from token

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // --- Authorization Check ---
        // Allow ONLY the patient who booked it to delete
        if (appointment.patientUsername !== loggedInUsername) {
            return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
        }

        // --- No status check needed now ---

        // --- Perform Deletion ---
        await Appointment.findByIdAndDelete(appointmentId);

        res.json({ message: 'Appointment cancelled and removed successfully' });

    } catch (error) {
        console.error('Error cancelling appointment:', error);
         if (error.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid appointment ID format' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});




// == Appointment Routes (Unchanged) ==
// POST /api/book-appointment (Public, but logic handled in frontend)
app.post('/api/book-appointment', async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(200).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/appointments (Doctor Protected)
app.get('/api/appointments', protect, async (req, res) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Not authorized. Doctors only.' });
    }
    try {
        const appointments = await Appointment.find({ doctor: req.user.username }).lean();
        res.json({ appointments });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/my-appointments (Patient Protected)
app.get('/api/my-appointments', protect, async (req, res) => {
    if (req.user.role !== 'patient') {
        return res.status(403).json({ message: 'Not authorized. Patients only.' });
    }
    try {
        const appointments = await Appointment.find({ patientUsername: req.user.username }).lean();
        res.json({ appointments });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


// == NEW: Combined Doctor Creation Route ==
// @desc    Create a new doctor user AND their profile in one step
// @route   POST /api/admin/create-doctor
// @access  Admin Only
app.post('/api/admin/create-doctor', adminProtect, async (req, res) => {
    const { username, password, displayName, specialty, bio } = req.body;

    // 1. Check for required fields
    if (!username || !password || !displayName || !specialty) {
        return res.status(400).json({ message: 'Please provide username, password, displayName, and specialty' });
    }

    try {
        // 2. Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists with that username' });
        }
        
        // 3. Create the User
        user = new User({
            username,
            password,
            role: 'doctor'
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        const newUser = await user.save();

        // 4. Create the Doctor Profile
        const doctorProfile = new DoctorProfile({
            userId: newUser._id,
            username: newUser.username,
            displayName,
            specialty,
            bio: bio || ''
        });
        await doctorProfile.save();

        res.status(201).json({ message: `Doctor account and profile for '${username}' created successfully.` });

    } catch (error) {
        console.error('Error creating doctor account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// == Other Doctor Profile Routes (Unchanged) ==
// GET /api/doctors (Public)
app.get('/api/doctors', async (req, res) => {
    try {
        // Find all profiles, but only send the fields we want to be public.
        const doctors = await DoctorProfile.find({}, 'username displayName specialty');
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/admin/doctors (Admin Protected)
app.get('/api/admin/doctors', adminProtect, async (req, res) => {
    try {
        const doctors = await DoctorProfile.find().populate('userId', 'username role');
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors for admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT /api/admin/doctors/:id (Admin Protected)
app.put('/api/admin/doctors/:id', adminProtect, async (req, res) => {
    const { displayName, specialty, bio } = req.body;
    try {
        const profile = await DoctorProfile.findById(req.params.id);
        if (!profile) {
            return res.status(44).json({ message: 'Doctor profile not found' });
        }

        profile.displayName = displayName || profile.displayName;
        profile.specialty = specialty || profile.specialty;
        profile.bio = bio || profile.bio;

        const updatedProfile = await profile.save();
        res.json(updatedProfile);
    } catch (error) {
        console.error('Error updating doctor profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.delete('/api/admin/doctors/:id', adminProtect, async (req, res) => {
    try {
        // Find the profile first to get the associated userId
        const profile = await DoctorProfile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        const userIdToDelete = profile.userId;

        // Delete the profile
        await DoctorProfile.deleteOne({ _id: req.params.id });
        
        // Delete the associated user account
        await User.deleteOne({ _id: userIdToDelete });

        res.json({ message: 'Doctor profile and user account removed successfully.' });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/admin/all-appointments (NEW: Admin gets all appointments)
app.get('/api/admin/all-appointments', adminProtect, async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: -1 }); // Sort by date, newest first
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching all appointments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/admin/patients (NEW: Admin gets all patient users)
app.get('/api/admin/patients', adminProtect, async (req, res) => {
    try {
        // Find all users with the role 'patient', select only username and createdAt
        const patients = await User.find({ role: 'patient' }).select('username createdAt');
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/admin/messages (NEW: Admin gets all contact messages)
app.get('/api/admin/messages', adminProtect, async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// --- Server Listener ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




