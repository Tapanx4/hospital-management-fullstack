import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { ChevronLeft } from 'lucide-react'; 

const AppointmentForm = () => {
    // isLoading added to wait for auth check
    const { isAuthenticated, user, token, isLoading: authLoading } = useContext(AuthContext); 
    const navigate = useNavigate();
    
    // State for the list of doctors fetched from the API
    const [doctors, setDoctors] = useState([]);
    const [doctorsLoading, setDoctorsLoading] = useState(true);

    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', date: '', time: '',
        doctor: '', reason: '', area: '', state: '', city: '',
        postalCode: '', patientUsername: ''
    });
    const [bookingStatus, setBookingStatus] = useState(null);
    const [error, setError] = useState('');
    // Added loading state for form submission
    const [submitLoading, setSubmitLoading] = useState(false); 

    // --- Fetch Doctors List on Component Mount ---
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setDoctorsLoading(true);
                const apiUrl = process.env.REACT_APP_API_URL;
// For fetching doctors:
const response = await fetch(`${apiUrl}/api/doctors`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors list');
                }
                const data = await response.json();
                setDoctors(data);
                
                if (data.length > 0) {
                    setFormData(prevState => ({
                        ...prevState,
                        doctor: data[0].username 
                    }));
                }
            } catch (err) {
                console.error("Error fetching doctors:", err);
                setError('Could not load doctors. Please try again later.');
            } finally {
                setDoctorsLoading(false);
            }
        };

        fetchDoctors();
    }, []); 

    // Set minimum date to today
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFormData(prevState => ({ ...prevState, date: today }));
    }, []);
    
    // --- REMOVED: Redirect logic useEffect ---
    // ProtectedRoute in App.js handles unauthorized access.
    // useEffect(() => {
    //     console.log("AppointmentForm useEffect check: isAuthenticated =", isAuthenticated, "user role =", user?.role); 
    //     if (isAuthenticated && user?.role && user.role !== 'patient') {
    //         console.log("AppointmentForm: Redirecting non-patient role:", user.role); 
    //         navigate('/doctor/appointments'); // Removed this redirect
    //     }
    // }, [isAuthenticated, user, navigate]);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setBookingStatus(null);
        setSubmitLoading(true); // Start submit loading

        // Check authentication right before submitting
        if (!isAuthenticated || user?.role !== 'patient') {
            setError('You must be logged in as a patient to book an appointment.');
            setSubmitLoading(false); // Stop loading
            return;
        }

        try {
            const submissionData = {
                ...formData,
                patientUsername: user.username 
            };
           const apiUrl = process.env.REACT_APP_API_URL;

// For booking appointment:
           const response = await fetch(`${apiUrl}/api/book-appointment`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Token might be needed if booking becomes protected later
                    // 'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Appointment booking failed');
            }
            
            setBookingStatus('success');
            // Reset form
            setFormData(prevState => ({
                ...prevState, fullName: '', email: '', phone: '', time: '', 
                reason: '', area: '', state: '', city: '', postalCode: '', patientUsername: '',
                date: new Date().toISOString().split('T')[0],
                doctor: doctors.length > 0 ? doctors[0].username : '' 
            }));

        } catch (err) {
            console.error('Appointment booking failed:', err);
            setBookingStatus('error');
            setError(err.message);
        } finally {
            setSubmitLoading(false); // Stop submit loading
        }
    };

    // --- Render loading state if initial auth check is still happening ---
     if (authLoading) {
         return (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                 <div style={{ width: '64px', height: '64px', border: '4px solid #d1d5db', borderTopColor: '#14b8a6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                 <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
             </div>
        );
    }
    
    // --- ProtectedRoute should handle this, but adding a check just in case ---
    // If auth is checked, but user is not authenticated OR not a patient, show error/link.
    if (!isAuthenticated || (user && user.role !== 'patient')) {
        return (
            <div className="container text-center mt-5 p-5 border rounded shadow-sm">
                <h2 className="mb-4">Access Denied</h2>
                <p className="mb-4">You must be logged in as a patient to book an appointment.</p>
                <Link to="/login" className="btn btn-primary btn-lg">
                    Go to Login Page
                </Link>
            </div>
        );
    }


    // --- Main Form Render (only if authenticated as patient) ---
    return (
        <div className="container my-5"> {/* Added margin */}
             {/* Back to Dashboard Link */}
            <div className="mb-4"> {/* Added margin bottom */}
                <Link to="/PatientDashboard" className="btn btn-outline-secondary d-inline-flex align-items-center">
                    <ChevronLeft size={18} className="me-2" />
                    Back to Dashboard
                </Link>
            </div>

            {/* Added Card structure for better visuals */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-lg-5"> {/* Added padding */}
                    
                    {bookingStatus === 'success' && (
                        <div className="alert alert-success mt-4" role="alert">
                            Appointment booked successfully!
                        </div>
                    )}
                    {(bookingStatus === 'error' || error) && (
                        <div className="alert alert-danger mt-4" role="alert">
                            {error || 'Error booking appointment. Please try again later.'}
                        </div>
                    )}

                    <h1 className="text-center mb-4">Book an Appointment</h1>
                    <p className="text-center text-muted mb-4">You are logged in as: <strong>{user?.username}</strong></p>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3"> {/* Use grid for better spacing */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="fullName" className="form-label">Full Name:</label>
                                <input type="text" className="form-control" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone" className="form-label">Phone:</label>
                                <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="date" className="form-label">Appointment Date:</label>
                                <input type="date" className="form-control" id="date" name="date" value={formData.date} min={new Date().toISOString().split('T')[0]} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="time" className="form-label">Appointment Time:</label>
                                <input type="time" className="form-control" id="time" name="time" value={formData.time} onChange={handleChange} required />
                            </div>
                            
                            {/* --- DYNAMIC DOCTOR DROPDOWN --- */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="doctor" className="form-label">Doctor:</label>
                                <select 
                                    className="form-select" id="doctor" name="doctor" 
                                    value={formData.doctor} onChange={handleChange} required
                                    disabled={doctorsLoading} 
                                >
                                    {doctorsLoading ? (
                                        <option value="" disabled>Loading doctors...</option>
                                    ) : doctors.length === 0 ? (
                                        <option value="" disabled>No doctors available</option>
                                    ) : (
                                        doctors.map(doc => (
                                            <option key={doc.username} value={doc.username}>
                                                {doc.displayName} ({doc.specialty})
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div className="col-12 mb-3">
                                <label htmlFor="reason" className="form-label">Reason for Appointment:</label>
                                <textarea className="form-control" id="reason" name="reason" value={formData.reason} onChange={handleChange} required rows="3"></textarea>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="area" className="form-label">Area:</label>
                                <input type="text" className="form-control" id="area" name="area" value={formData.area} onChange={handleChange} required />
                            </div>
                             <div className="col-md-6 mb-3">
                                <label htmlFor="city" className="form-label">City:</label>
                                <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="state" className="form-label">State:</label>
                                <input type="text" className="form-control" id="state" name="state" value={formData.state} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="postalCode" className="form-label">Postal Code:</label>
                                <input type="text" className="form-control" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                            </div>
                        </div> {/* End row */}
                        <div className="text-center mt-4"> {/* Center button */}
                            <button type="submit" className="btn btn-primary btn-lg px-5" disabled={doctorsLoading || submitLoading}>
                                {submitLoading ? 'Booking...' : 'Book Appointment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppointmentForm;

