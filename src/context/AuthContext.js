import React, { createContext, useState, useEffect } from 'react';

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // This will hold the full object { token, user: {...} }
    const [loading, setLoading] = useState(true); // To handle initial auth check

    // Check for user data in localStorage when the app loads
    useEffect(() => {
        try {
            const userString = localStorage.getItem('user');
            if (userString) {
                const userData = JSON.parse(userString);
                // Ensure the loaded data has the expected structure
                if (userData && userData.token && userData.user) {
                    setUser(userData);
                    console.log("AuthContext: User loaded from localStorage", userData); // Debug Log
                } else {
                    console.warn("AuthContext: Invalid user data found in localStorage. Clearing."); // Debug Log
                    localStorage.removeItem('user');
                    setUser(null);
                }
            } else {
                 console.log("AuthContext: No user found in localStorage."); // Debug Log
            }
        } catch (error) {
            console.error("AuthContext: Failed to parse user from localStorage", error);
            localStorage.removeItem('user');
            setUser(null);
        } finally {
            setLoading(false); // Finished checking auth state
            console.log("AuthContext: Initial auth check finished."); // Debug Log
        }
    }, []);

    // Login function
    const login = (userData) => {
        // Ensure userData has the correct structure before saving
        if (userData && userData.token && userData.user) {
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            console.log("AuthContext: User logged in and saved.", userData); // Debug Log
        } else {
            console.error("AuthContext: Invalid userData passed to login function.", userData); // Debug Log
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        console.log("AuthContext: User logged out."); // Debug Log
    };

    // --- FIX IS HERE ---
    // The value provided to consuming components
    // We now explicitly provide 'token' and the nested 'user' object separately.
    const value = {
        user: user?.user,        // Provides the nested user object { id, username, role }
        token: user?.token,      // Provides the token directly
        login,
        logout,
        isAuthenticated: !!user, // Still checks if the main user object exists
        isLoading: loading 
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

