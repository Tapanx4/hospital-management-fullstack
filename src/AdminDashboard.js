import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, X, CheckCircle, AlertTriangle, Users, Calendar, MessageSquare, Briefcase } from 'lucide-react';

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, type, text }) => {
    if (!isOpen) return null;
    const isSuccess = type === 'success';
    const successColor = '#16a34a'; // green-600
    const errorColor = '#dc2626'; // red-600
    const Icon = isSuccess ? CheckCircle : AlertTriangle;

    return (
        <div
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1050
            }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-2xl"
                style={{
                    width: '90%',
                    maxWidth: '500px',
                    borderTop: `6px solid ${isSuccess ? successColor : errorColor}`,
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className={`text-2xl font-semibold ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>{isSuccess ? 'Success' : 'Error'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={28} />
                    </button>
                </div>
                {/* Modal Body */}
                <div className="p-6 flex items-start">
                    <Icon size={32} className={`mr-4 flex-shrink-0 ${isSuccess ? 'text-green-600' : 'text-red-600'}`} />
                    <p className="text-gray-700 text-base" style={{ paddingTop: '5px' }}>{text}</p>
                </div>
                {/* Modal Footer */}
                <div className="p-4 bg-gray-50 text-right rounded-b-lg">
                    <button onClick={onClose} className="btn btn-primary">Close</button>
                </div>
            </div>
        </div>
    );
};


// --- Admin Dashboard Component (Updated) ---
const AdminDashboard = () => {
    const { user, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // --- State ---
    const [formState, setFormState] = useState({ username: '', password: '', role: 'doctor', displayName: '', specialty: '', bio: '' });
    const [loading, setLoading] = useState(false);
    const [modalState, setModalState] = useState({ isOpen: false, type: '', text: '' });
    const [doctors, setDoctors] = useState([]);
    const [doctorsLoading, setDoctorsLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormState, setEditFormState] = useState(null);
    const [activeTab, setActiveTab] = useState('doctors');

    // --- Data Fetching ---
    const fetchData = async (tab) => {
         // Now 'token' should be correctly defined here
        if (!token) {
            setModalState({ isOpen: true, type: 'error', text: 'Authentication error. Please log in again.' });
            // Ensure loading states are false if we return early
            if (tab === 'doctors') setDoctorsLoading(false);
            return;
        }

        // Helper for fetch options
        const fetchOptions = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            if (tab === 'doctors') {
                setDoctorsLoading(true);
                const apiUrl = process.env.REACT_APP_API_URL;
// Example for fetching doctors:
const res = await fetch(`${apiUrl}/api/admin/doctors`, fetchOptions);
                
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Failed to fetch doctors');
                }
                setDoctors(await res.json());
                setDoctorsLoading(false);
            }
            else if (tab === 'appointments') {
                const apiUrl = process.env.REACT_APP_API_URL;
                const res = await fetch(`${apiUrl}/api/admin/all-appointments`, fetchOptions);
                 if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Failed to fetch appointments');
                }
                // Sort appointments by date before setting state
                const appData = await res.json();
                const sortedApps = appData.sort((a, b) => new Date(b.date) - new Date(a.date));
                setAppointments(sortedApps);
            }
            else if (tab === 'patients') {
                const apiUrl = process.env.REACT_APP_API_URL;
                const res = await fetch(`${apiUrl}/api/admin/patients`, fetchOptions);
                 if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Failed to fetch patients');
                }
                 // Sort patients by creation date before setting state
                const patientData = await res.json();
                const sortedPatients = patientData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPatients(sortedPatients);
            }
            else if (tab === 'messages') {
                const apiUrl = process.env.REACT_APP_API_URL;
                const res = await fetch(`${apiUrl}/api/admin/messages`, fetchOptions);
                 if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Failed to fetch messages');
                }
                // Sort messages by creation date before setting state
                const messageData = await res.json();
                const sortedMessages = messageData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setMessages(sortedMessages);
            }
        } catch (err) {
            setModalState({ isOpen: true, type: 'error', text: err.message });
            if (tab === 'doctors') setDoctorsLoading(false); // Ensure loading stops on error too
        }
    };

    // Fetch initial data for doctors tab
    useEffect(() => {
        if(token) {
            fetchData('doctors');
        } else {
            setDoctorsLoading(false);
        }
    }, [token]); // Depend on token

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        fetchData(tab);
    };

    // --- Event Handlers (Create, Delete, Edit) ---
    const handleChange = (e) => { setFormState({ ...formState, [e.target.name]: e.target.value }); };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) { setModalState({ isOpen: true, type: 'error', text: 'Authentication error. Cannot perform action.' }); return; }
        setLoading(true);
         try {
            const apiUrl = process.env.REACT_APP_API_URL;
            let response, data, endpoint;
            let body = { ...formState };

            if (formState.role === 'doctor') {
               endpoint = `${apiUrl}/api/admin/create-doctor`;
                delete body.role;
            } else {
                endpoint = `${apiUrl}/api/auth/register`;
                body = { username: formState.username, password: formState.password, role: formState.role };
            }

            response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(body)
            });

            data = await response.json();
            if (!response.ok) throw new Error(data.message || `Failed to create ${formState.role}`);

            setModalState({ isOpen: true, type: 'success', text: data.message });
            setFormState({ username: '', password: '', role: 'doctor', displayName: '', specialty: '', bio: '' });
            if (formState.role === 'doctor') fetchData('doctors'); // Refresh doctors list if a doctor was created
        } catch (err) {
            setModalState({ isOpen: true, type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (profileId) => {
         if (!token) { setModalState({ isOpen: true, type: 'error', text: 'Authentication error. Cannot perform action.' }); return; }
        if (!window.confirm("Are you sure? This will delete the doctor's profile AND user account.")) { return; }
         try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/admin/doctors/${profileId}`, { 
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to delete doctor');

            setModalState({ isOpen: true, type: 'success', text: data.message });
            fetchData('doctors'); // Refresh list
        } catch (err) {
            setModalState({ isOpen: true, type: 'error', text: err.message });
        }
    };
    const handleEditClick = (profile) => { setEditFormState(profile); setIsEditModalOpen(true); };
    const handleEditChange = (e) => { setEditFormState({ ...editFormState, [e.target.name]: e.target.value }); };
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
         if (!token) { setModalState({ isOpen: true, type: 'error', text: 'Authentication error. Cannot perform action.' }); setIsEditModalOpen(false); return; }
        setLoading(true);
         try {
            const { _id, displayName, specialty, bio } = editFormState;
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/admin/doctors/${_id}`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ displayName, specialty, bio })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to update profile');

            setIsEditModalOpen(false);
            setModalState({ isOpen: true, type: 'success', text: 'Profile updated successfully!' });
            fetchData('doctors'); // Refresh list
        } catch (err) {
            setIsEditModalOpen(false);
            setModalState({ isOpen: true, type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };
    const handleLogout = () => { logout(); navigate('/login'); };

    // Helpers
    const formatDate = (dateString) => {
        if (!dateString || isNaN(new Date(dateString).getTime())) { return 'Invalid Date'; }
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
        return new Date(dateString).toLocaleString('en-US', options);
    };
    const formatAppointmentDate = (dateString, timeString) => {
       if (!dateString || isNaN(new Date(dateString).getTime())) { return 'Invalid Date'; }
       const datePart = new Date(dateString).toLocaleDateString('en-US', { dateStyle: 'medium' });
       let timePart = timeString || '';
       try {
           if (timeString) {
                const [hours, minutes] = timeString.split(':');
                const tempDate = new Date();
                tempDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                timePart = tempDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
           }
       } catch (e) {
           console.warn("Could not format time string:", timeString, e);
           timePart = timeString || '';
       }
       return timePart ? `${datePart} at ${timePart}` : datePart;
    };


    return (
        <>
            {/* --- Modals --- */}
            <Modal isOpen={modalState.isOpen} onClose={() => setModalState({ isOpen: false, type: '', text: '' })} type={modalState.type} text={modalState.text} />
            {isEditModalOpen && editFormState && (
                 <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1060 }} onClick={() => setIsEditModalOpen(false)}>
                    <div className="bg-white p-4 rounded shadow-xl" style={{ minWidth: '450px', maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
                        <form onSubmit={handleUpdateSubmit}>
                           <div className="flex justify-between items-center border-b pb-3 mb-4">
                                <h3 className="text-xl font-bold">Edit Profile for {editFormState.displayName}</h3>
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-700" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edit_displayName" className="form-label">Display Name</label>
                                <input type="text" className="form-control" id="edit_displayName" name="displayName" value={editFormState.displayName} onChange={handleEditChange} required />
                            </div>
                             <div className="mb-3">
                                <label htmlFor="edit_specialty" className="form-label">Specialty</label>
                                <input type="text" className="form-control" id="edit_specialty" name="specialty" value={editFormState.specialty} onChange={handleEditChange} required />
                            </div>
                             <div className="mb-3">
                                <label htmlFor="edit_bio" className="form-label">Bio</label>
                                <textarea className="form-control" id="edit_bio" name="bio" value={editFormState.bio || ''} onChange={handleEditChange}></textarea>
                            </div>
                            <div className="text-right mt-4">
                                <button type="button" className="btn btn-secondary me-2" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-success" disabled={loading}>
                                    {loading ? 'Updating...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- Main Dashboard Layout --- */}
            <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '40px' }}>
                {/* Header Banner */}
                 <div style={{ background: 'linear-gradient(90deg, #1e3a8a 0%, #1e40af 100%)', padding: '40px 60px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div>
                        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', margin: '0' }}>Admin Dashboard</h1>
                        <p style={{ color: '#dbeafe', marginTop: '8px', fontSize: '18px', margin: '8px 0 0 0' }}> Logged in as: <strong>{user?.username}</strong> </p>
                    </div>
                    <button onClick={handleLogout} style={{ background: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}> Logout </button>
                </div>

                {/* Main Content Container */}
                <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px' }}>

                    {/* --- Tab Navigation --- */}
                    <ul className="nav nav-tabs nav-fill mb-4">
                        <li className="nav-item">
                            <button className={`nav-link d-flex align-items-center justify-content-center ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => handleTabChange('doctors')}> <Briefcase size={18} className="me-2" /> Manage Doctors </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link d-flex align-items-center justify-content-center ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => handleTabChange('appointments')}> <Calendar size={18} className="me-2" /> Manage Appointments </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link d-flex align-items-center justify-content-center ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => handleTabChange('patients')}> <Users size={18} className="me-2" /> Manage Patients </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link d-flex align-items-center justify-content-center ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => handleTabChange('messages')}> <MessageSquare size={18} className="me-2" /> View Messages </button>
                        </li>
                    </ul>

                    {/* --- Tab Content --- */}
                    <div className="tab-content pt-3">

                        {/* === Doctors Tab === */}
                        {activeTab === 'doctors' && (
                           <div className="row g-4">
                                <div className="col-lg-5">
                                    <div className="bg-white p-4 rounded shadow h-100">
                                        <h2 className="text-xl font-bold mb-4 border-bottom pb-3">Create New Account</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="role" className="form-label">Account Type</label>
                                                <select className="form-select" id="role" name="role" value={formState.role} onChange={handleChange} required> <option value="doctor">Doctor</option> <option value="admin">Admin</option> </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="username" className="form-label">Username</label>
                                                <input type="text" className="form-control" id="username" name="username" value={formState.username} onChange={handleChange} required autoComplete="off" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="password" name="password" value={formState.password} onChange={handleChange} required autoComplete="new-password" />
                                            </div>
                                            {formState.role === 'doctor' && (
                                                <>
                                                    <hr className="my-3" />
                                                    <h4 className="text-lg font-semibold mb-3">Doctor Profile Details</h4>
                                                    <div className="mb-3"> <label htmlFor="displayName" className="form-label">Display Name</label> <input type="text" className="form-control" id="displayName" name="displayName" value={formState.displayName} onChange={handleChange} required={formState.role === 'doctor'} /> </div>
                                                    <div className="mb-3"> <label htmlFor="specialty" className="form-label">Specialty</label> <input type="text" className="form-control" id="specialty" name="specialty" value={formState.specialty} onChange={handleChange} required={formState.role === 'doctor'} /> </div>
                                                    <div className="mb-3"> <label htmlFor="bio" className="form-label">Bio (Optional)</label> <textarea className="form-control" id="bio" name="bio" value={formState.bio} onChange={handleChange}></textarea> </div>
                                                </>
                                            )}
                                            <button type="submit" className="btn btn-success w-100 mt-3" disabled={loading}> {loading ? 'Creating...' : `Create ${formState.role} Account`} </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                     <div className="bg-white p-4 rounded shadow h-100">
                                        <h2 className="text-xl font-bold mb-4 border-bottom pb-3">Manage Doctors</h2>
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover table-sm">
                                                <thead> <tr> <th>Display Name</th> <th>Username</th> <th>Specialty</th> <th className="text-end">Actions</th> </tr> </thead>
                                                <tbody>
                                                    {doctorsLoading ? ( <tr><td colSpan="4" className="text-center text-muted py-3">Loading...</td></tr>
                                                    ) : doctors.length === 0 ? ( <tr> <td colSpan="4" className="text-center text-muted py-3">No doctor profiles found.</td> </tr>
                                                    ) : (
                                                        doctors.map(profile => (
                                                            <tr key={profile._id}>
                                                                <td className="align-middle">{profile.displayName}</td>
                                                                <td className="align-middle">{profile.username}</td>
                                                                <td className="align-middle">{profile.specialty}</td>
                                                                <td className="text-end align-middle">
                                                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditClick(profile)} title="Edit Profile"> <Edit2 size={16} /> </button>
                                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(profile._id)} title="Delete Profile and User"> <Trash2 size={16} /> </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        )}

                        {/* === Appointments Tab === */}
                        {activeTab === 'appointments' && (
                            <div className="bg-white p-4 rounded shadow">
                                <h2 className="text-xl font-bold mb-4 border-bottom pb-3">All Appointments</h2>
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover table-sm">
                                        <thead> <tr> <th>Date & Time</th> <th>Patient</th> <th>Doctor</th> <th>Reason</th> <th>Patient Email</th> </tr> </thead>
                                        <tbody>
                                            {appointments.length === 0 ? ( <tr><td colSpan="5" className="text-center text-muted py-3">No appointments found.</td></tr>
                                            ) : (
                                                appointments.map(app => (
                                                    <tr key={app._id}>
                                                        <td className="align-middle">{formatAppointmentDate(app.date, app.time)}</td>
                                                        <td className="align-middle">{app.patientUsername}</td>
                                                        <td className="align-middle">{app.doctor}</td>
                                                        <td className="align-middle">{app.reason}</td>
                                                        <td className="align-middle">{app.email}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* === Patients Tab === */}
                        {activeTab === 'patients' && (
                             <div className="bg-white p-4 rounded shadow">
                                <h2 className="text-xl font-bold mb-4 border-bottom pb-3">All Patients</h2>
                                 <div className="table-responsive">
                                    <table className="table table-striped table-hover table-sm">
                                        <thead> <tr> <th>Username</th> <th>Registered On</th> </tr> </thead>
                                        <tbody>
                                            {patients.length === 0 ? ( <tr><td colSpan="2" className="text-center text-muted py-3">No patients found.</td></tr>
                                            ) : (
                                                patients.map(p => (
                                                    <tr key={p._id}>
                                                        <td className="align-middle">{p.username}</td>
                                                        <td className="align-middle">{formatDate(p.createdAt)}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* === Messages Tab === */}
                        {activeTab === 'messages' && (
                             <div className="bg-white p-4 rounded shadow">
                                <h2 className="text-xl font-bold mb-4 border-bottom pb-3">Contact Messages</h2>
                                {messages.length === 0 ? ( <p className="text-center text-muted py-3">No messages found.</p>
                                ) : (
                                    messages.map(msg => (
                                        <div key={msg._id} className="border rounded mb-3 bg-light">
                                            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                                                <div> <strong className="me-3 fs-5">{msg.name}</strong> <span className="text-muted me-3">&lt;{msg.email}&gt;</span> </div>
                                                <span className="text-muted small">{formatDate(msg.createdAt)}</span>
                                            </div>
                                            <div className="p-3"> <h5 className="font-semibold mb-2">{msg.subject || '(No Subject)'}</h5> <p className="mb-0 text-secondary">{msg.message}</p> </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;




