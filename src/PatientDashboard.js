import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Calendar, Clock, User, FileText, RefreshCw, PlusCircle, Briefcase, Trash2, Edit, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

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


const PatientDashboard = () => {
    const { user, token, logout, isLoading: authLoading } = useContext(AuthContext);
    // Combined state for all fetched appointments (no longer needed directly for rendering)
    // const [allAppointments, setAllAppointments] = useState([]);
    // State for filtered lists
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false); // For Cancel/Reschedule actions
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [modalState, setModalState] = useState({ isOpen: false, type: '', text: '' });
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    // Initialize rescheduleData with all needed keys
    const [rescheduleData, setRescheduleData] = useState({
        appointmentId: null,
        currentDate: '',
        currentTime: '',
        newDate: '',
        newTime: ''
    });

    // --- Data Fetching & Filtering ---
    const fetchAppointments = async () => {
        console.log("PatientDashboard: Fetching appointments...");
        setLoading(true);
        setError('');
        if (!token) {
            console.error("PatientDashboard: No token available for fetching appointments.");
            setError("Authentication error. Please log in again.");
            setLoading(false);
            return;
         }

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
// For fetching appointments:
const response = await fetch(`${apiUrl}/api/my-appointments`, { 
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("PatientDashboard: Fetch response status:", response.status);
            if (!response.ok) {
                let errorData;
                try { errorData = await response.json(); } catch(e) { /* ... handle non-json error ... */
                    errorData = { message: `HTTP error! Status: ${response.status} - ${response.statusText}` };
                }
                console.error("PatientDashboard: Fetch error data:", errorData);
                throw new Error(errorData?.message || `Failed to fetch appointments (Status: ${response.status})`);
             }
            const data = await response.json();
            console.log("PatientDashboard: Fetched data:", data);
             if (data && Array.isArray(data.appointments)) {
                // Store all fetched appointments temporarily for filtering
                const allFetched = data.appointments;
                console.log("PatientDashboard: All appointments fetched:", allFetched);

                // --- Filter into Upcoming and Past ---
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set to midnight for date comparison

                const upcoming = allFetched
                    .filter(app => new Date(app.date) >= today)
                    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort upcoming soonest first

                const past = allFetched
                    .filter(app => new Date(app.date) < today)
                    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort past newest first

                setUpcomingAppointments(upcoming);
                setPastAppointments(past);
                console.log("PatientDashboard: Upcoming:", upcoming, "Past:", past);

            } else {
                 console.error("PatientDashboard: Unexpected data structure received:", data);
                 setError("Received invalid data from server.");
                 setUpcomingAppointments([]); // Reset arrays on error
                 setPastAppointments([]);
            }
        } catch (err) {
            console.error('PatientDashboard: Error during fetchAppointments:', err);
            setError(err.message);
            setUpcomingAppointments([]); // Reset arrays on error
            setPastAppointments([]);
        } finally {
            setLoading(false);
            console.log("PatientDashboard: Fetch finished, loading set to false.");
         }
    };

    // Fetch appointments effect
    useEffect(() => {
        console.log("PatientDashboard: useEffect triggered. AuthLoading:", authLoading, "Token:", token ? "Present" : "Absent");
        if (!authLoading && token) { fetchAppointments(); }
        else if (!authLoading && !token) { setLoading(false); }
         else { console.log("PatientDashboard: Waiting for initial auth check..."); }
    }, [token, authLoading]);

    // --- Event Handlers ---
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCancel = async (appointmentId) => {
        if (!window.confirm("Are you sure you want to permanently cancel this appointment?")) {
            return;
        }
        setActionLoading(true);
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/appointments/${appointmentId}`, { 
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to cancel appointment');

            setModalState({ isOpen: true, type: 'success', text: data.message });
            fetchAppointments(); // Refresh the list
        } catch (err) {
            setModalState({ isOpen: true, type: 'error', text: err.message });
        } finally {
            setActionLoading(false);
        }
    };

    const handleRescheduleClick = (appointment) => {
         const dateForInput = appointment.date ? new Date(appointment.date).toISOString().split('T')[0] : '';
        setRescheduleData({
            appointmentId: appointment._id,
            currentDate: dateForInput,
            currentTime: appointment.time || '',
            newDate: dateForInput,
            newTime: appointment.time || ''
        });
        setIsRescheduleModalOpen(true);
    };

    const handleRescheduleChange = (e) => {
        setRescheduleData({ ...rescheduleData, [e.target.name]: e.target.value });
    };

    const handleRescheduleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            const { appointmentId, newDate, newTime } = rescheduleData;
            if (!newDate || !newTime) {
                 throw new Error("Please select a new date and time.");
            }
            if (new Date(newDate) < new Date(new Date().toDateString())) {
                throw new Error("Cannot reschedule to a past date.");
            }
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/appointments/${appointmentId}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ date: newDate, time: newTime })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to reschedule');

            setIsRescheduleModalOpen(false);
            setModalState({ isOpen: true, type: 'success', text: data.message || 'Appointment rescheduled successfully!' }); // Use message from backend
            fetchAppointments(); // Refresh list
        } catch (err) {
             // Keep modal open on error to allow correction
             setModalState({ isOpen: true, type: 'error', text: err.message });
        } finally {
            setActionLoading(false);
        }
     };

    // Helpers
    const formatDate = (dateString) => {
        if (!dateString || isNaN(new Date(dateString).getTime())) { return 'Invalid Date'; }
        return new Date(dateString).toLocaleString('en-US', { dateStyle: 'medium' });
     };
     const formatAppointmentDate = (dateString, timeString) => {
       if (!dateString || isNaN(new Date(dateString).getTime())) { return 'Invalid Date'; }
       const datePart = new Date(dateString).toLocaleDateString('en-US', { dateStyle: 'medium' });
       return timeString ? `${datePart} at ${timeString}` : datePart;
    };

    // --- Render Logic ---
    if (authLoading) {
         return (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                 <div style={{ width: '64px', height: '64px', border: '4px solid #d1d5db', borderTopColor: '#14b8a6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                 <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
             </div>
        );
     }
    if (!user) {
         return (
            <div className="container text-center mt-5">
                <p>Authentication error. Please <Link to="/login">log in</Link>.</p>
            </div>
         );
     }

    // --- Reusable Appointment Card Component ---
    // Moved inside the main component to easily access state like actionLoading and handlers
    const AppointmentCard = ({ appointment, isUpcoming }) => (
        <div
            key={appointment._id}
            style={{
                background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                overflow: 'hidden', border: '1px solid #e5e7eb', opacity: isUpcoming ? 1 : 0.7 // Dim past appointments
            }}
        >
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* Date Badge */}
                <div style={{
                    background: isUpcoming ? 'linear-gradient(180deg, #14b8a6 0%, #0d9488 100%)' : '#6b7280', // Different color for past
                    color: 'white', padding: '24px', display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    minWidth: '160px'
                }}>
                    <Calendar size={32} style={{ marginBottom: '8px' }} />
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', opacity: '0.9' }}>{appointment.date ? new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' }) : 'N/A'}</div>
                        <div style={{ fontSize: '48px', fontWeight: 'bold', lineHeight: '1' }}>{appointment.date ? new Date(appointment.date).getDate() : '?'}</div>
                        <div style={{ fontSize: '14px', opacity: '0.9' }}>{appointment.date ? new Date(appointment.date).getFullYear() : 'N/A'}</div>
                    </div>
                </div>

                {/* Appointment Details */}
                <div style={{ flex: '1', padding: '24px', minWidth: '300px' }}>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                         {/* Time */}
                         <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                             <div style={{ padding: '10px', background: '#ccfbf1', borderRadius: '8px' }}>
                                 <Clock size={24} style={{ color: '#14b8a6' }} />
                             </div>
                             <div>
                                 <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Time</div>
                                 <div style={{ color: '#1f2937', fontWeight: '600', fontSize: '20px' }}>{appointment.time || 'N/A'}</div>
                             </div>
                         </div>
                         {/* Doctor */}
                         <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                             <div style={{ padding: '10px', background: '#dbeafe', borderRadius: '8px' }}>
                                 <Briefcase size={24} style={{ color: '#3b82f6' }} />
                             </div>
                             <div>
                                 <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Doctor</div>
                                 <div style={{ color: '#1f2937', fontWeight: '600', fontSize: '20px' }}>{appointment.doctor || 'N/A'}</div>
                             </div>
                         </div>
                         {/* Reason */}
                         <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                             <div style={{ padding: '10px', background: '#fef3c7', borderRadius: '8px' }}>
                                 <FileText size={24} style={{ color: '#d97706' }} />
                             </div>
                             <div>
                                 <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Reason</div>
                                 <div style={{ color: '#1f2937', fontWeight: '600', fontSize: '20px' }}>{appointment.reason || 'N/A'}</div>
                             </div>
                         </div>
                    </div>

                    {/* Action Buttons - Only show for Upcoming */}
                    {isUpcoming && (
                        <div className="mt-4 text-end">
                            <button
                                className="btn btn-sm btn-outline-warning me-2"
                                onClick={() => handleRescheduleClick(appointment)}
                                disabled={actionLoading}
                                title="Reschedule Appointment"
                            >
                                <Edit size={16} className="me-1" /> Reschedule
                            </button>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleCancel(appointment._id)}
                                disabled={actionLoading}
                                title="Cancel Appointment"
                            >
                                 <Trash2 size={16} className="me-1" /> Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );


    return (
        <>
            {/* --- Modals --- */}
            <Modal isOpen={modalState.isOpen} onClose={() => setModalState({ isOpen: false, type: '', text: '' })} type={modalState.type} text={modalState.text} />

            {/* --- Reschedule Modal --- */}
            {isRescheduleModalOpen && rescheduleData && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1060
                 }}
                 onClick={() => setIsRescheduleModalOpen(false)}
                 >
                    <div className="bg-white p-4 rounded shadow-xl" style={{ minWidth: '450px', maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
                        <form onSubmit={handleRescheduleSubmit}>
                            <div className="flex justify-between items-center border-b pb-3 mb-4">
                                <h3 className="text-xl font-bold">Reschedule Appointment</h3>
                                <button type="button" onClick={() => setIsRescheduleModalOpen(false)} className="text-gray-400 hover:text-gray-700" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <p className="mb-3 text-muted">Current: {formatAppointmentDate(rescheduleData.currentDate, rescheduleData.currentTime)}</p>
                            <div className="mb-3">
                                <label htmlFor="reschedule_date" className="form-label">New Date</label>
                                <input
                                    type="date" className="form-control" id="reschedule_date"
                                    name="newDate" value={rescheduleData.newDate}
                                    min={new Date().toISOString().split('T')[0]} // Prevent past dates
                                    onChange={handleRescheduleChange} required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reschedule_time" className="form-label">New Time</label>
                                <input
                                    type="time" className="form-control" id="reschedule_time"
                                    name="newTime" value={rescheduleData.newTime}
                                    onChange={handleRescheduleChange} required
                                />
                            </div>
                            <div className="text-right mt-4">
                                <button type="button" className="btn btn-secondary me-2" onClick={() => setIsRescheduleModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-success" disabled={actionLoading}>
                                    {actionLoading ? 'Saving...' : 'Confirm Reschedule'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- Main Dashboard Layout --- */}
            <div style={{ background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)', minHeight: '100vh', paddingBottom: '40px' }}>
                {/* Header Banner */}
                 <div style={{
                    background: 'linear-gradient(90deg, #14b8a6 0%, #0d9488 100%)',
                    padding: '40px 60px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                 }}>
                    <div>
                        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', margin: '0' }}> Your Dashboard </h1> {/* Updated Title */}
                        <p style={{ color: '#ccfbf1', marginTop: '8px', fontSize: '18px', margin: '8px 0 0 0' }}> Manage your appointments below. </p> {/* Updated Subtitle */}
                    </div>
                     <button onClick={handleLogout} style={{
                        background: '#2563eb',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600'
                     }}>
                        Logout
                    </button>
                </div>

                {/* Main Content Container */}
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 60px' }}>
                    {/* Top section with only Book button */}
                    <div style={{ textAlign: 'right', marginBottom: '32px' }}> {/* Aligned button right */}
                        <Link to="/appointment" style={{ textDecoration: 'none' }}>
                             <button style={{
                                background: '#14b8a6', color: 'white', padding: '12px 24px', borderRadius: '8px',
                                fontWeight: '600', border: 'none', cursor: 'pointer', display: 'inline-flex', /* Changed to inline-flex */
                                alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                             }}>
                                <PlusCircle size={20} /> Book New Appointment
                             </button>
                        </Link>
                    </div>

                    {/* --- Appointments List --- */}
                    {loading ? (
                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 0' }}>
                             <div style={{ width: '64px', height: '64px', border: '4px solid #d1d5db', borderTopColor: '#14b8a6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                         </div>
                    ) : error ? (
                         <div className="alert alert-danger"> Error: {error} </div>
                    ) : (
                        <>
                            {/* --- Upcoming Appointments Section --- */}
                            <div className="mb-5">
                                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px', borderBottom: '2px solid #14b8a6', paddingBottom: '8px' }}>
                                    Upcoming Appointments ({upcomingAppointments.length})
                                </h2>
                                {upcomingAppointments.length === 0 ? (
                                    <div className="text-center p-5 bg-light rounded text-muted">No upcoming appointments scheduled.</div>
                                ) : (
                                    <div style={{ display: 'grid', gap: '24px' }}>
                                        {upcomingAppointments.map((app) => (
                                            <AppointmentCard key={app._id} appointment={app} isUpcoming={true} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* --- Past Appointments Section --- */}
                            <div>
                                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#6b7280', marginBottom: '24px', borderBottom: '2px solid #ccc', paddingBottom: '8px' }}>
                                    Past Appointments ({pastAppointments.length})
                                </h2>
                                {pastAppointments.length === 0 ? (
                                    <div className="text-center p-5 bg-light rounded text-muted">No past appointment history found.</div>
                                ) : (
                                     <div style={{ display: 'grid', gap: '24px' }}>
                                        {pastAppointments.map((app) => (
                                            <AppointmentCard key={app._id} appointment={app} isUpcoming={false} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <style>{` @keyframes spin { to { transform: rotate(360deg); } } `}</style>
            </div>
        </>
    );
};

export default PatientDashboard;

