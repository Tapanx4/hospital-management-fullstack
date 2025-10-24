import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Simple component for a clean, modern registration form
const Register = () => {
    // State hooks to manage form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State hooks for handling feedback to the user
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // --- Input Validation ---
        if (password !== confirmPassword) {
            return setError('Passwords do not match.');
        }
        if (password.length < 6) {
            return setError('Password must be at least 6 characters long.');
        }

        setLoading(true);

        try {
            // Send registration request to the new backend endpoint
           const apiUrl = process.env.REACT_APP_API_URL;
const response = await fetch(`${apiUrl}/api/auth/register-patient`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // If the server responds with an error, display it
                throw new Error(data.message || 'Failed to register.');
            }
            
            // On success, show a message and redirect to the login page after a short delay
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000); // 2-second delay

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h1 style={styles.title}>Create Patient Account</h1>
                <p style={styles.subtitle}>Join our portal to manage your appointments.</p>
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Display success or error messages */}
                    {error && <div style={{...styles.message, ...styles.error}}>{error}</div>}
                    {success && <div style={{...styles.message, ...styles.success}}>{success}</div>}

                    <div style={styles.inputGroup}>
                        <label htmlFor="username" style={styles.label}>Username</label>
                        <input
                            type="text"
                            id="username"
                            style={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                     <div style={styles.inputGroup}>
                        <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            style={styles.input}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <div style={styles.footerText}>
                    Already have an account? <Link to="/login" style={styles.link}>Log In</Link>
                </div>
            </div>
        </div>
    );
};

// --- Inline CSS Styles for the component ---
// This keeps the component self-contained and easy to manage.
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
        padding: '20px',
    },
    formWrapper: {
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
        margin: '0 0 10px 0',
    },
    subtitle: {
        fontSize: '16px',
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: '30px',
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#374151',
        fontWeight: '600',
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '15px',
        border: 'none',
        borderRadius: '8px',
        background: '#14b8a6',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    footerText: {
        marginTop: '25px',
        textAlign: 'center',
        color: '#4b5563',
    },
    link: {
        color: '#0d9488',
        fontWeight: '600',
        textDecoration: 'none',
    },
    message: {
        padding: '12px',
        marginBottom: '20px',
        borderRadius: '8px',
        textAlign: 'center',
    },
    error: {
        background: '#fecaca',
        color: '#b91c1c',
    },
    success: {
        background: '#d1fae5',
        color: '#065f46',
    }
};

export default Register;
