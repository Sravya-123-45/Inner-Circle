import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Activity, User, MessageCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();

    const linkStyle = ({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        color: isActive ? 'white' : 'var(--text-muted)',
        background: isActive ? 'var(--primary-gradient)' : 'transparent',
        transition: 'all 0.2s',
        fontWeight: isActive ? 600 : 400,
        marginBottom: '0.5rem'
    });

    return (
        <div className="glass-panel desktop-only" style={{
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            width: '280px',
            borderRadius: '0',
            borderRight: '1px solid var(--border-color)',
            borderTop: 0,
            borderBottom: 0,
            borderLeft: 0,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 50,
            padding: '2rem'
        }}>
            {/* Logo */}
            <div style={{ marginBottom: '3rem', paddingLeft: '0.5rem' }}>
                <h1 className="text-gradient" style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '1px', fontWeight: 800 }}>INNER CIRCLE</h1>
            </div>

            {/* Nav Links */}
            <nav style={{ flex: 1 }}>
                <NavLink to="/" style={linkStyle}>
                    <Home size={22} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/chat" style={linkStyle}>
                    <MessageCircle size={22} />
                    <span>Chatbot</span>
                </NavLink>
                <NavLink to="/health" style={linkStyle}>
                    <Activity size={22} />
                    <span>Health Stats</span>
                </NavLink>
                <NavLink to="/profile" style={linkStyle}>
                    <User size={22} />
                    <span>Profile</span>
                </NavLink>
            </nav>

            {/* Bottom Actions */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={20} color="var(--text-muted)" />
                    </div>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>{user?.name || 'User'}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free Plan</p>
                    </div>
                </div>

                <button onClick={logout} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--danger-color)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)'
                }}>
                    <LogOut size={20} />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
