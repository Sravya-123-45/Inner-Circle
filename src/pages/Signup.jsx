import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail } from 'lucide-react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email);
        navigate('/');
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
            background: 'var(--bg-primary)'
        }}>
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '420px',
                padding: '2.5rem',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 className="holographic-text" style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: '800' }}>Join Inner Circle</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1rem' }}>
                        Start your journey to mental clarity today.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="email"
                            placeholder="email@domain.com"
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
                        Create Account
                    </button>
                </form>

                <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }}></div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>or sign up with</span>
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

                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', lineHeight: '1.5', margin: '0 0 1rem' }}>
                        By continuing, you agree to our <span style={{ color: 'var(--text-primary)', cursor: 'pointer' }}>Terms</span> and <span style={{ color: 'var(--text-primary)', cursor: 'pointer' }}>Privacy Policy</span>.
                    </p>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>Already have an account? </span>
                    <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
