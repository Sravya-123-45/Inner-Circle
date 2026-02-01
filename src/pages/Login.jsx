import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to log in');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            background: 'var(--bg-primary)' /* Explicit soft background */
        }}>
            {/* Centered Card */}
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '420px',
                padding: '2.5rem',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--bg-secondary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        <User size={32} color="var(--primary-color)" />
                    </div>
                    <h1 className="holographic-text" style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', letterSpacing: '0.5px' }}>INNER CIRCLE</h1>
                    <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Welcome back to your safe space</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                paddingLeft: '3rem',
                                height: '48px',
                                fontSize: '1rem'
                            }}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                paddingLeft: '3rem',
                                height: '48px',
                                fontSize: '1rem'
                            }}
                            required
                        />
                    </div>

                    {error && <p style={{ color: 'var(--danger-color)', fontSize: 'var(--text-sm)', textAlign: 'center' }}>{error}</p>}

                    <button
                        type="submit"
                        style={{
                            background: 'var(--primary-gradient)',
                            color: 'white',
                            padding: '0.875rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            fontSize: '1rem',
                            marginTop: '0.5rem',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    >
                        Sign In
                    </button>

                    <div style={{ textAlign: 'center' }}>
                        <Link to="/forgot-password" style={{ fontSize: 'var(--text-sm)', color: 'var(--primary-color)', fontWeight: 500 }}>Forgot password?</Link>
                    </div>
                </form>

                <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }}></div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Or continue with</span>
                    <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <button style={{
                        background: 'white',
                        color: 'var(--text-primary)',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: 500,
                        border: '1px solid var(--border-color)'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>G</span> Google
                    </button>

                    <button style={{
                        background: 'black',
                        color: 'white',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: 500
                    }}>
                        <span></span> Apple
                    </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>New here? </span>
                    <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Create account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
