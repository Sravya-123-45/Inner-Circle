import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Camera, User, Lock, Mail, Ruler, Weight, Calendar } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();

    // Reusable Form Section Component
    const FormSection = ({ title, children }) => (
        <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                {title}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {children}
            </div>
        </div>
    );

    const InputGroup = ({ label, icon: Icon, defaultValue, disabled }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</label>
            <div style={{ position: 'relative' }}>
                <Icon size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    defaultValue={defaultValue}
                    disabled={disabled}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.75rem',
                        background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.2)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.95rem',
                        color: disabled ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}
                />
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="page-padding" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Account Settings</h1>
                    <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)' }}>Manage your profile and preferences</p>
                </div>

                <div className="profile-grid">
                    {/* Left Col: Identity Card */}
                    <div className="glass-panel" style={{
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        height: '100%',
                        justifyContent: 'center'
                    }}>
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(255,255,255,0.05) 100%)',
                                border: '3px solid var(--bg-primary)',
                                boxShadow: '0 0 0 2px var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <User size={50} color="var(--text-muted)" />
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                background: 'var(--primary-color)',
                                padding: '8px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                border: '3px solid var(--bg-primary)'
                            }}>
                                <Camera size={16} color="white" />
                            </div>
                        </div>

                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{user?.name || 'Student User'}</h2>
                        <span style={{
                            marginTop: '0.5rem',
                            background: 'rgba(99, 102, 241, 0.15)',
                            color: '#818cf8',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.5px'
                        }}>
                            PRO MEMBER
                        </span>

                        <button onClick={logout} style={{
                            marginTop: '2rem',
                            width: '100%',
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#f87171',
                            padding: '0.85rem',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            fontSize: '0.9rem'
                        }}>
                            <Lock size={16} />
                            Sign Out
                        </button>
                    </div>

                    {/* Right Col: Details Form */}
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', height: '100%', overflowY: 'auto' }}>
                        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                                    Personal
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <InputGroup label="Full Name" icon={User} defaultValue={user?.name || "John Doe"} />
                                    <InputGroup label="Age" icon={Calendar} defaultValue="24" />
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <InputGroup label="Email" icon={Mail} defaultValue={user?.email || "user@uni.edu"} disabled />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                                    Vitals
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <InputGroup label="Height" icon={Ruler} defaultValue="5' 9''" />
                                    <InputGroup label="Weight" icon={Weight} defaultValue="70 kg" />
                                </div>
                            </div>

                            <button style={{
                                marginTop: '1rem',
                                background: 'transparent',
                                color: 'var(--text-primary)',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                border: '1px solid var(--border-color)',
                                fontWeight: 500
                            }}>
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Mobile Responsiveness Override (CSS-in-JS for specific component fix) */}
            <style>{`
                @media (max-width: 1024px) {
                    .profile-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                    .health-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default Profile;
