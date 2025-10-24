
// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from './context/AuthContext'; // Ensure this path is correct
// import logo from './newlogo.jpg'; // Ensure this path is correct
// import { LogOut, User, LayoutDashboard } from 'lucide-react';

// const Navbar = () => {
//     // We get 'user' which is now { id, username, role } directly
//     const { isAuthenticated, user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     // Helper to get the correct dashboard link based on role
//     const getDashboardLink = () => {
//         // Use user.role directly
//         if (!user?.role) return '/'; 
        
//         switch (user.role) {
//             case 'admin':
//                 return '/admin/dashboard';
//             case 'doctor':
//                 return '/doctor/appointments';
//             case 'patient':
//                 return '/dashboard';
//             default:
//                 return '/';
//         }
//     };

//     return (
//         <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
//             <div className="container-fluid">
//                 <Link className="navbar-brand" to="/">
//                     <img src={logo} alt="Trinity Hospital Logo" style={{ height: '40px', marginRight: '10px' }} />
//                     Trinity Hospital
//                 </Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     {/* Main Nav Links (Left) */}
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/services">Services</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/contact">Contact Us</Link>
//                         </li>
//                     </ul>

//                     {/* Auth Links (Right) */}
//                     <ul className="navbar-nav ms-auto">
//                         {isAuthenticated && user ? ( // Check for user object specifically
//                             // --- User is Logged In ---
//                             <>
//                                 <li className="nav-item d-flex align-items-center me-3">
//                                     <span className="navbar-text">
//                                         {/* FIX: Use user.username directly */}
//                                         Welcome, <strong>{user.username}</strong> ({user.role}) 
//                                     </span>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="btn btn-outline-primary me-2" to={getDashboardLink()}>
//                                         <LayoutDashboard size={18} className="me-1" />
//                                         My Dashboard
//                                     </Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <button className="btn btn-outline-secondary" onClick={handleLogout}>
//                                         <LogOut size={18} className="me-1" />
//                                         Logout
//                                     </button>
//                                 </li>
//                             </>
//                         ) : (
//                             // --- User is Logged Out ---
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="btn btn-primary me-2" to="/login">
//                                         <User size={18} className="me-1" />
//                                         Login
//                                     </Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="btn btn-secondary" to="/register">
//                                         Register
//                                     </Link>
//                                 </li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; // Ensure this path is correct
import logo from './newlogo.jpg'; // Ensure this path is correct
import { LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    // We get 'user' which is now { id, username, role } directly
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Helper to get the correct dashboard link based on role
    const getDashboardLink = () => {
        const role = user?.role; // Get role directly
        console.log("Navbar: Getting dashboard link for role:", role); // DEBUG LOG

        if (!role) {
            console.log("Navbar: No role found, defaulting to '/'"); // DEBUG LOG
            return '/'; 
        }
        
        switch (role) {
            case 'admin':
                console.log("Navbar: Role is admin, link is /admin/dashboard"); // DEBUG LOG
                return '/admin/dashboard';
            case 'doctor':
                console.log("Navbar: Role is doctor, link is /doctor/appointments"); // DEBUG LOG
                return '/doctor/appointments';
            case 'patient':
                console.log("Navbar: Role is patient, link is /dashboard"); // DEBUG LOG
                return '/PatientDashboard'; // Ensure this is correct
            default:
                 console.log("Navbar: Unknown role, defaulting to '/'"); // DEBUG LOG
                return '/';
        }
    };

    const dashboardLink = getDashboardLink(); // Calculate link once

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Trinity Hospital Logo" style={{ height: '40px', marginRight: '10px' }} />
                    Trinity Hospital
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Main Nav Links (Left) */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                        </li>
                        {/* Add other links like About, Doctors if needed */}
                    </ul>

                    {/* Auth Links (Right) */}
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticated && user ? ( // Check for user object specifically
                            // --- User is Logged In ---
                            <>
                                <li className="nav-item d-flex align-items-center me-3">
                                    <span className="navbar-text">
                                        Welcome, <strong>{user.username}</strong> ({user.role}) 
                                    </span>
                                </li>
                                <li className="nav-item">
                                    {/* Use the calculated dashboardLink */}
                                    <Link className="btn btn-outline-primary me-2" to={dashboardLink}> 
                                        <LayoutDashboard size={18} className="me-1" />
                                        My Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-secondary" onClick={handleLogout}>
                                        <LogOut size={18} className="me-1" />
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            // --- User is Logged Out ---
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-primary me-2" to="/login">
                                        <User size={18} className="me-1" />
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-secondary" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;



