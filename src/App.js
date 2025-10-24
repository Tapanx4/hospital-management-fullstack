
// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // --- Import your components ---
// import Home from './home';
// import Login from './login';
// import Register from './Register';
// import ApDisplay from './apdisplay';
// import PatientDashboard from './PatientDashboard';
// import AppointmentForm from './appointment'; 
// import AdminDashboard from './AdminDashboard';
// import ContactUs from './Contact';
// import Navbar from './Navbar';
// import Services from './services'; 
// import About from './about';     
// import Dr1 from './dr1';         
// import Dr2 from './dr2';         
// import ScrollButton from "./ScrollButton";

// // Import CSS 
// import './home.css'; 
// import './App.css'; 

// // --- Import the Auth Context & Provider ---
// import { AuthProvider, AuthContext } from './context/AuthContext';

// // Standard protected route
// const ProtectedRoute = ({ children }) => {
//     const { isAuthenticated, isLoading, user } = useContext(AuthContext); // Added user here for logging
    
//     // Log status when ProtectedRoute checks
//     console.log("ProtectedRoute Check: isLoading=", isLoading, "isAuthenticated=", isAuthenticated, "User Role=", user?.role); 

//     if (isLoading) { 
//         console.log("ProtectedRoute: Waiting for auth check...");
//         return <div>Loading...</div>; 
//     }
//     if (!isAuthenticated) { 
//         console.log("ProtectedRoute: Not authenticated, redirecting to login.");
//         return <Navigate to="/login" replace />; 
//     }
//     // If authenticated, render the children (the actual page component)
//     console.log("ProtectedRoute: Authenticated, rendering children.");
//     return children;
// };

// // Admin-only protected route
// const AdminRoute = ({ children }) => {
//     const { isAuthenticated, user, isLoading } = useContext(AuthContext);
    
//     // Log status when AdminRoute checks
//     console.log("AdminRoute Check: isLoading=", isLoading, "isAuthenticated=", isAuthenticated, "User Role=", user?.role); 
    
//     if (isLoading) { 
//          console.log("AdminRoute: Waiting for auth check...");
//         return <div>Loading...</div>; 
//     }
//     if (!isAuthenticated || user?.role !== 'admin') { 
//         console.log("AdminRoute: Not authenticated or not admin, redirecting to login.");
//         return <Navigate to="/login" replace />; 
//     }
//      console.log("AdminRoute: Authenticated as admin, rendering children.");
//     return children;
// };


// const App = () => {
//     // CDN links should be in public/index.html

//     return (
//         <AuthProvider>
//             <Router>
//                 <Navbar />
//                 <ScrollButton />

//                 <div>
//                     <Routes>
//                         {/* === Public Routes === */}
//                         <Route path="/" element={<Home />} />
//                         <Route path="/about" element={<About />} />
//                         <Route path="/contact" element={<ContactUs />} />
//                         <Route path="/dr1" element={<Dr1 />} />
//                         <Route path="/dr2" element={<Dr2 />} />
//                         <Route path="/services" element={<Services />} />
//                         <Route path="/login" element={<Login />} />
//                         <Route path="/register" element={<Register />} />

//                         {/* === Protected Routes === */}
//                         <Route
//                             path="/appointment"
//                             element={<ProtectedRoute><AppointmentForm /></ProtectedRoute>}
//                         />
//                         <Route
//                             path="/doctor/appointments"
//                             element={<ProtectedRoute><ApDisplay /></ProtectedRoute>}
//                         />
//                         {/* Ensure this route is correct */}
//                         <Route
//                             path="/dashboard" 
//                             element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}
//                         />

//                         {/* === Admin Protected Route === */}
//                         <Route
//                             path="/admin/dashboard"
//                             element={ <AdminRoute> <AdminDashboard /> </AdminRoute> }
//                         />

//                         {/* === Fallback Route === */}
//                         <Route path="*" element={<Navigate to="/" />} />
//                     </Routes>
//                 </div>
//             </Router>
//         </AuthProvider>
//     );
// };

// export default App;
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- Import your components ---
import Home from './home';
import Login from './login';
import Register from './Register';
import ApDisplay from './apdisplay';
import PatientDashboard from './PatientDashboard';
import AppointmentForm from './appointment';
import AdminDashboard from './AdminDashboard';
import ContactUs from './Contact';
import Navbar from './Navbar';
import Services from './services';
import About from './about';
import Dr1 from './dr1';
import Dr2 from './dr2';
import ScrollButton from "./ScrollButton";

// Import CSS
import './home.css';
import './App.css';

// --- Import the Auth Context & Provider ---
import { AuthProvider, AuthContext } from './context/AuthContext';

// Standard protected route (checks for any login)
const ProtectedRoute = ({ children }) => {
    // isLoading: Tracks if the context is still checking initial auth state (from localStorage)
    // isAuthenticated: Boolean derived from whether 'user' exists in context state
    const { isAuthenticated, isLoading, user } = useContext(AuthContext);

    // Add log to see the state when ProtectedRoute renders
    console.log(`ProtectedRoute Check: Path=${window.location.pathname}, isLoading=${isLoading}, isAuthenticated=${isAuthenticated}, User Role=${user?.role}`);

    // 1. If still checking initial authentication state, show loading
    if (isLoading) {
        console.log("ProtectedRoute: Auth state still loading...");
        // Return a loading indicator or null to prevent rendering children prematurely
        return (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                 <div style={{ width: '64px', height: '64px', border: '4px solid #d1d5db', borderTopColor: '#14b8a6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                 <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
             </div>
        );
    }

    // 2. If finished loading and NOT authenticated, redirect to login
    if (!isAuthenticated) {
        console.log("ProtectedRoute: Not authenticated after loading, redirecting to /login.");
        // 'replace' prevents adding the current (unauthorized) URL to history
        return <Navigate to="/login" replace />;
    }

    // 3. If finished loading and authenticated, render the requested component
    console.log("ProtectedRoute: Authenticated, rendering children.");
    return children;
};

// Admin-only protected route
const AdminRoute = ({ children }) => {
    const { isAuthenticated, user, isLoading } = useContext(AuthContext);

    console.log(`AdminRoute Check: Path=${window.location.pathname}, isLoading=${isLoading}, isAuthenticated=${isAuthenticated}, User Role=${user?.role}`);

    if (isLoading) {
         console.log("AdminRoute: Auth state still loading...");
        return (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                 <div style={{ width: '64px', height: '64px', border: '4px solid #d1d5db', borderTopColor: '#1e3a8a', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                 <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
             </div>
        );
    }

    if (!isAuthenticated || user?.role !== 'admin') {
         console.log(`AdminRoute: Access denied (Authenticated=${isAuthenticated}, Role=${user?.role}), redirecting to /login.`);
        return <Navigate to="/login" replace />;
    }

    console.log("AdminRoute: Authenticated as admin, rendering children.");
    return children;
};


const App = () => {
    // CDN links should be in public/index.html

    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <ScrollButton />

                <div>
                    <Routes>
                        {/* === Public Routes === */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/dr1" element={<Dr1 />} />
                        <Route path="/dr2" element={<Dr2 />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* === Protected Routes === */}
                        {/* Using element prop correctly */}
                        <Route path="/appointment" element={ <ProtectedRoute> <AppointmentForm /> </ProtectedRoute> } />
                        <Route path="/doctor/appointments" element={ <ProtectedRoute> <ApDisplay /> </ProtectedRoute> } />
                        <Route path="/PatientDashboard" element={ <ProtectedRoute> <PatientDashboard /> </ProtectedRoute> } />

                        {/* === Admin Protected Route === */}
                        <Route path="/admin/dashboard" element={ <AdminRoute> <AdminDashboard /> </AdminRoute> } />

                        {/* === Fallback Route === */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;



