// // import React, { useState, useContext } from "react";
// // import { Link, useNavigate } from 'react-router-dom';
// // import './login.css';
// // import { AuthContext } from './context/AuthContext';

// // const Login = () => {
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const [loading, setLoading] = useState(false);
    
// //     const { login } = useContext(AuthContext);
// //     const navigate = useNavigate();

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setError('');
// //         setLoading(true);

// //         try {
// //             const response = await fetch('http://localhost:8080/api/auth/login', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ username, password }),
// //             });

// //             const data = await response.json();

// //             if (!response.ok) {
// //                 throw new Error(data.message || 'Login failed');
// //             }

// //             // Save user data and token via context
// //             login(data);

// //             // Redirect based on user role
// //             if (data.user.role === 'doctor') {
// //                 navigate('/doctor/appointments');
// //             } else if (data.user.role === 'patient') {
// //                 navigate('/PatientDashboard'); // You should define this route
// //             } else {
// //                 navigate('/');
// //             }

// //         } catch (err) {
// //             setError(err.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div>
// //             <h1 className="d text-white" style={{ paddingTop: '20px', paddingLeft: '100px' }}>Login Portal</h1>
// //             <div className="login-container">
// //                 <form onSubmit={handleSubmit} className="login-form">
// //                     <h2>Login</h2>
// //                     <input
// //                         type="text"
// //                         placeholder="Username"
// //                         value={username}
// //                         onChange={(e) => setUsername(e.target.value)}
// //                         required
// //                         disabled={loading}
// //                     />
// //                     <input
// //                         type="password"
// //                         placeholder="Password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                         disabled={loading}
// //                     />
// //                     <button type="submit" disabled={loading}>
// //                         {loading ? 'Logging in...' : 'Login'}
// //                     </button>
// //                     {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
                    
// //                     <div style={{ marginTop: '20px', textAlign: 'center', color: '#333' }}>
// //                         Don't have a patient account?{' '}
// //                         <Link to="/register" style={{ color: '#0d9488', fontWeight: 'bold' }}>
// //                             Register Here
// //                         </Link>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Login;

// import React,{ useState, useContext } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import './login.css';
// import { AuthContext } from './context/AuthContext';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
    
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);

//         try {
//             const response = await fetch('http://localhost:8080/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });
//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Login failed');
//             }
            
//             login(data);

//             // --- THIS IS THE KEY FIX ---
//             // Navigate based on the user's role
//             if (data.user.role === 'admin') {
//                 navigate('/AdminDashboard'); // Redirect admins
//             } else if (data.user.role === 'doctor') {
//                 navigate('/doctor/appointments');
//             } else if (data.user.role === 'patient') {
//                 navigate('/PatientDashboard'); 
//             } else {
//                 // Default fallback to the home page
//                 navigate('/');
//             }

//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h1 className="d text-white" style={{ paddingTop: '20px', paddingLeft: '100px' }}>Login Portal</h1>
//             <div className="login-container">
//                 <form onSubmit={handleSubmit} className="login-form">
//                     <h2>Login</h2>
//                     <input
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                         disabled={loading}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         disabled={loading}
//                     />
//                     <button type="submit" disabled={loading}>
//                         {loading ? 'Logging in...' : 'Login'}
//                     </button>
//                     {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
                    
//                     <div style={{ marginTop: '20px', textAlign: 'center', color: '#333' }}>
//                         Don't have a patient account?{' '}
//                         <Link to="/register" style={{ color: '#0d9488', fontWeight: 'bold' }}>
//                             Register Here
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;
import React,{ useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; // Make sure this CSS file exists and path is correct
import { AuthContext } from './context/AuthContext'; // Ensure path is correct

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                // Use the error message from the backend if available
                throw new Error(data.message || 'Login failed. Please check username and password.');
            }

            // Log the data received from the backend to verify structure
            console.log("Login successful, data received:", data);

            // Check if the expected user data structure exists
            if (!data || !data.user || !data.user.role) {
                throw new Error("Login response from server is missing user role information.");
            }

            // Call context login function AFTER verifying data structure
            login(data);

            // --- Navigation Logic ---
            console.log("Navigating based on role:", data.user.role); // Log the role being used
            if (data.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (data.user.role === 'doctor') {
                navigate('/doctor/appointments');
            } else if (data.user.role === 'patient') {
                // Ensure this path matches the Route in App.js
                navigate('/PatientDashboard');
            } else {
                // Fallback to home page if role is unknown
                console.warn("Unknown user role:", data.user.role, "Navigating to home.");
                navigate('/');
            }

        } catch (err) {
            setError(err.message || "An unexpected error occurred during login.");
            console.error("Login handleSubmit error:", err); // Log the full error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Using className for consistency, assuming App.css or index.css styles it */}
            <h1 className="page-title text-white" style={{ paddingTop: '20px', paddingLeft: '100px' }}>Login Portal</h1>
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                        autoComplete="username" // Added autocomplete hint
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        autoComplete="current-password" // Added autocomplete hint
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

                    <div style={{ marginTop: '20px', textAlign: 'center', color: '#333' }}>
                        Don't have a patient account?{' '}
                        <Link to="/register" style={{ color: '#0d9488', fontWeight: 'bold' }}>
                            Register Here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

