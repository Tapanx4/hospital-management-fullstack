// import React, { useState, useEffect, useContext, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './context/AuthContext'; // Import the AuthContext
// import { Calendar, Clock, User, FileText, RefreshCw, LogOut } from 'lucide-react';

// const ApDisplay = () => {
//     const { user, logout, isAuthenticated } = useContext(AuthContext); // Get user and logout function
//     const navigate = useNavigate();

//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // DEBUG: Log initial context values on each render
//     console.log("ApDisplay re-rendered. Auth state:", { isAuthenticated, user });

//     const fetchAppointments = useCallback(async () => {
//         console.log("Attempting to fetch appointments...");
        
//         if (!user?.token) {
//             console.error("Fetch aborted: No user token found in context.");
//             setLoading(false);
//             setError("Authentication token not found. Please log in again.");
//             return;
//         }

//         setLoading(true);
//         setError(null);
        
//         try {
//             const response = await fetch(`http://localhost:8080/api/appointments`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${user.token}`
//                 }
//             });
            
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.error("API Error Response:", errorData);
//                 throw new Error(errorData.message || 'Failed to fetch appointments');
//             }

//             const data = await response.json();
//             console.log("Successfully fetched appointment data:", data);
//             setAppointments(data.appointments);

//         } catch (err) {
//             console.error('CRITICAL ERROR in fetchAppointments:', err);
//             setError(err.message);
//         } finally {
//             console.log("Fetch process finished. Setting loading to false.");
//             setLoading(false);
//         }
//     }, [user?.token]);

//     useEffect(() => {
//         console.log("useEffect triggered.");
//         if (!isAuthenticated) {
//             console.log("User is not authenticated. Redirecting to login.");
//             navigate('/login');
//         } else {
//             console.log("User is authenticated. Calling fetchAppointments.");
//             fetchAppointments();
//         }
//     }, [isAuthenticated, navigate, fetchAppointments]);

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };
    
//     // This is a crucial check. If the component is stuck, it's likely here.
//     console.log("Pre-render check. State:", { loading, hasUser: !!user });

//     if (loading || !user) {
//         console.log("Render decision: Showing loading spinner.");
//         return (
//              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//                 <div style={{
//                     width: '64px', height: '64px', border: '4px solid #d1d5db',
//                     borderTopColor: '#14b8a6', borderRadius: '50%', animation: 'spin 1s linear infinite'
//                 }}></div>
//                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//             </div>
//         )
//     }

//     console.log("Render decision: Showing main component UI.");
//     return (
//         <div style={{ background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)', minHeight: '100vh', paddingBottom: '40px' }}>
//              {/* Header Banner */}
//             <div style={{ 
//                 background: 'linear-gradient(90deg, #14b8a6 0%, #0d9488 100%)', 
//                 padding: '40px 60px',
//                 boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center'
//             }}>
//                 <div>
//                     <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', margin: '0' }}>
//                         {/* CORRECTED: Accessing the nested username property */}
//                         Welcome, Dr. {user?.user?.username}
//                     </h1>
//                     <p style={{ color: '#ccfbf1', marginTop: '8px', fontSize: '18px', margin: '8px 0 0 0' }}>
//                         Manage your upcoming appointments
//                     </p>
//                 </div>
//                 {/* Wrapper for header buttons */}
//                 <div style={{ display: 'flex', gap: '16px' }}>
//                     <button 
//                         onClick={fetchAppointments}
//                         style={{
//                             background: '#14b8a6', border: '2px solid white', color: 'white',
//                             padding: '10px 20px', borderRadius: '8px', fontWeight: '600',
//                             cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
//                         }}
//                         onMouseEnter={(e) => { e.currentTarget.style.background = '#0d9488'; }}
//                         onMouseLeave={(e) => { e.currentTarget.style.background = '#14b8a6'; }}
//                     >
//                         <RefreshCw size={20} />
//                         Refresh
//                     </button>
//                     <button 
//                         onClick={handleLogout}
//                         style={{
//                             background: 'transparent', border: '2px solid white', color: 'white',
//                             padding: '10px 20px', borderRadius: '8px', fontWeight: '600',
//                             cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
//                         }}
//                         onMouseEnter={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#14b8a6'; }}
//                         onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}
//                     >
//                         <LogOut size={20} />
//                         Logout
//                     </button>
//                 </div>
//             </div>

//             {/* Main Content Container */}
//             <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 60px' }}>
//                 {error && (
//                     <div style={{ background: '#fecaca', border: '1px solid #f87171', color: '#b91c1c', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
//                         <strong>Error:</strong> {error}
//                     </div>
//                 )}

//                 {appointments.length === 0 && !loading ? (
//                     <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '64px', textAlign: 'center' }}>
//                          <div style={{ display: 'inline-block', padding: '24px', background: '#ccfbf1', borderRadius: '50%', marginBottom: '24px' }}>
//                              <Calendar size={48} style={{ color: '#14b8a6' }} />
//                          </div>
//                          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
//                              No Appointments Scheduled
//                          </h3>
//                          <p style={{ color: '#6b7280' }}>
//                              You don't have any upcoming appointments at the moment.
//                          </p>
//                     </div>
//                 ) : (
//                      <div style={{ display: 'grid', gap: '24px' }}>
//                         {appointments.map((appointment) => (
//                             <div 
//                                 key={appointment._id}
//                                 style={{
//                                     background: 'white', borderRadius: '16px',
//                                     boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden',
//                                     border: '1px solid #e5e7eb', transition: 'all 0.3s'
//                                 }}
//                                 onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.15)'}
//                                 onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
//                             >
//                                 <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                                      <div style={{
//                                          background: 'linear-gradient(180deg, #14b8a6 0%, #0d9488 100%)', color: 'white',
//                                          padding: '24px', display: 'flex', flexDirection: 'column',
//                                          alignItems: 'center', justifyContent: 'center', minWidth: '160px'
//                                      }}>
//                                          <Calendar size={32} style={{ marginBottom: '8px' }} />
//                                          <div style={{ textAlign: 'center' }}>
//                                              <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', opacity: '0.9' }}>
//                                                  {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
//                                              </div>
//                                              <div style={{ fontSize: '48px', fontWeight: 'bold', lineHeight: '1' }}>
//                                                  {new Date(appointment.date).getDate()}
//                                              </div>
//                                              <div style={{ fontSize: '14px', opacity: '0.9' }}>
//                                                  {new Date(appointment.date).getFullYear()}
//                                              </div>
//                                          </div>
//                                      </div>
//                                      {/* Restored Detailed Appointment View */}
//                                      <div style={{ flex: '1', padding: '32px', minWidth: '300px' }}>
//                                          <div style={{ 
//                                              display: 'grid', 
//                                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
//                                              gap: '32px' 
//                                          }}>
//                                              {/* Time */}
//                                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
//                                                  <div style={{ padding: '10px', background: '#ccfbf1', borderRadius: '8px' }}><Clock size={24} style={{ color: '#14b8a6' }} /></div>
//                                                  <div>
//                                                      <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Time</div>
//                                                      <div style={{ color: '#1f2937', fontWeight: '600', fontSize: '20px' }}>{appointment.time}</div>
//                                                  </div>
//                                              </div>
//                                              {/* Patient */}
//                                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
//                                                  <div style={{ padding: '10px', background: '#dbeafe', borderRadius: '8px' }}><User size={24} style={{ color: '#3b82f6' }} /></div>
//                                                  <div>
//                                                      <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Patient</div>
//                                                      <div style={{ color: '#1f2937', fontWeight: '600', fontSize: '20px' }}>{appointment.fullName}</div>
//                                                  </div>
//                                              </div>
//                                              {/* Reason */}
//                                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
//                                                  <div style={{ padding: '10px', background: '#f3e8ff', borderRadius: '8px' }}><FileText size={24} style={{ color: '#a855f7' }} /></div>
//                                                  <div>
//                                                      <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Reason</div>
//                                                      <div style={{ color: '#1f2937', fontWeight: '600', fontSize: '20px' }}>{appointment.reason}</div>
//                                                  </div>
//                                              </div>
//                                          </div>
//                                      </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ApDisplay;

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext'; // Ensure path is correct
import { Calendar, Clock, User, FileText, RefreshCw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
    // Correctly destructures user {id, username, role} and token
    const { user, token, logout, isLoading: authLoading } = useContext(AuthContext); 
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchAppointments = async () => {
        // Double-check token presence just before fetching
        if (!token) {
            setError("Authentication token not found. Please log in again.");
            setLoading(false);
            console.error("ApDisplay: Attempted fetch without token!"); // Debug Log
            return; // Stop fetching if no token
        }
        
        console.log("ApDisplay: Fetching appointments with token:", token); // DEBUG LOG
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8080/api/appointments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Use the token obtained from context
                    'Authorization': `Bearer ${token}` 
                }
            });

            console.log("ApDisplay: Fetch response status:", response.status); // DEBUG LOG

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch(e) {
                    // Handle cases where the response might not be JSON (e.g., server crash)
                    errorData = { message: `HTTP error! Status: ${response.status} - ${response.statusText}` };
                }
                console.error("ApDisplay: Fetch error data:", errorData); // DEBUG LOG
                // Use a clearer error message if possible
                throw new Error(errorData.message || `Failed to fetch appointments (Status: ${response.status})`);
            }

            const data = await response.json();
            console.log("ApDisplay: Fetched data:", data); // DEBUG LOG

            if (data && Array.isArray(data.appointments)) {
                setAppointments(data.appointments);
            } else {
                 console.error("ApDisplay: Unexpected data structure received:", data); // DEBUG LOG
                 setError("Received invalid data from server.");
                 setAppointments([]);
            }

        } catch (err) {
            console.error('ApDisplay: Error during fetchAppointments:', err); // DEBUG LOG
            setError(err.message);
            setAppointments([]); // Clear appointments on error
        } finally {
            setLoading(false);
            console.log("ApDisplay: Fetch finished, loading set to false."); // DEBUG LOG
        }
    };

    // --- Effect to Fetch Data ---
    useEffect(() => {
        // Wait until the initial auth check is complete AND we have a token
        if (!authLoading) {
            console.log("ApDisplay: Auth check complete. Token:", token ? "Present" : "Absent"); // DEBUG LOG
            if (token) {
                fetchAppointments();
            } else {
                 // This case should ideally be handled by ProtectedRoute, but good to have a fallback
                console.log("ApDisplay: No token found after auth check, redirecting to login."); // DEBUG LOG
                setLoading(false); // Stop loading if no token
                // Optional: Redirect if ProtectedRoute somehow failed
                // navigate('/login'); 
            }
        } else {
            console.log("ApDisplay: Still waiting for auth check..."); // DEBUG LOG
        }
    }, [token, authLoading]); // Depend on token AND authLoading status

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

     // Helper to format date strings
    const formatDate = (dateString) => new Date(dateString).toLocaleString('en-US', { dateStyle: 'medium' });


    // Show loading spinner while initial auth check is happening
    if (authLoading) {
         return (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                 <div style={{ width: '64px', height: '64px', border: '4px solid #d1d5db', borderTopColor: '#14b8a6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                 <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
             </div>
        );
    }

    return (
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
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', margin: '0' }}>
                        {/* Use user.username directly */}
                        Welcome, Dr. {user?.username || 'Doctor'} 
                    </h1>
                    <p style={{ color: '#ccfbf1', marginTop: '8px', fontSize: '18px', margin: '8px 0 0 0' }}>
                        Manage your upcoming appointments
                    </p>
                </div>
                 <button 
                    onClick={handleLogout}
                    style={{ background: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                >
                     <LogOut size={18} className="me-1" /> {/* Added Icon */}
                    Logout
                </button>
            </div>


            {/* Main Content Container */}
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>Your Appointments</h2>
                        <p style={{ color: '#6b7280', marginTop: '4px', fontSize: '16px' }}>
                            {appointments.length} {appointments.length === 1 ? 'appointment' : 'appointments'} scheduled
                        </p>
                    </div>
                    <button 
                        onClick={fetchAppointments} // Keep refresh button
                        style={{ background: '#14b8a6', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                        disabled={loading} // Disable while loading
                    >
                        <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                {/* --- Appointments List --- */}
                 {loading ? (
                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 0' }}>
                         <div style={{ width: '64px', height: '64px', border: '4px solid #d1d5db', borderTopColor: '#14b8a6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                     </div>
                ) : error ? (
                     <div className="alert alert-danger">Error: {error}</div>
                ) : appointments.length === 0 ? (
                    /* Empty State */
                    <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '64px', textAlign: 'center' }}>
                         <div style={{ display: 'inline-block', padding: '24px', background: '#ccfbf1', borderRadius: '50%', marginBottom: '24px' }}>
                            <Calendar size={48} style={{ color: '#14b8a6' }} />
                        </div>
                        <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                            No Appointments Scheduled
                        </h3>
                        <p style={{ color: '#6b7280' }}>You don't have any upcoming appointments at the moment.</p>
                    </div>
                ) : (
                    /* Appointments Grid */
                    <div style={{ display: 'grid', gap: '24px' }}>
                        {appointments.map((appointment) => (
                            <div key={appointment._id} /* ... appointment card styling ... */ >
                                {/* ... appointment card content ... */}
                                {/* Example: */}
                                 <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {/* Date Badge */}
                                    <div style={{ /* ... styles ... */ }}> 
                                        {/* ... date content ... */}
                                    </div>
                                    {/* Appointment Details */}
                                    <div style={{ flex: '1', padding: '32px', minWidth: '300px' }}>
                                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                                            {/* Time */}
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                <div style={{ padding: '10px', background: '#ccfbf1', borderRadius: '8px' }}>
                                                    <Clock size={24} style={{ color: '#14b8a6' }} />
                                                </div>
                                                <div>
                                                    <div style={{ /* ... */ }}>Time</div>
                                                    <div style={{ /* ... */ }}>{appointment.time || 'N/A'}</div>
                                                </div>
                                            </div>
                                            {/* Patient */}
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                <div style={{ padding: '10px', background: '#dbeafe', borderRadius: '8px' }}>
                                                    <User size={24} style={{ color: '#3b82f6' }} />
                                                </div>
                                                <div>
                                                    <div style={{ /* ... */ }}>Patient</div>
                                                    {/* Display patient username for doctor */}
                                                    <div style={{ /* ... */ }}>{appointment.patientUsername || 'N/A'}</div>
                                                </div>
                                            </div>
                                            {/* Reason */}
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                <div style={{ padding: '10px', background: '#fef3c7', borderRadius: '8px' }}>
                                                    <FileText size={24} style={{ color: '#d97706' }} />
                                                </div>
                                                <div>
                                                    <div style={{ /* ... */ }}>Reason</div>
                                                    <div style={{ /* ... */ }}>{appointment.reason || 'N/A'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
             <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                .animate-spin { animation: spin 1s linear infinite; }
            `}</style>
        </div>
    );
};

export default Appointments;

