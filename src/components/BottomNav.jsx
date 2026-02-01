import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Activity, User } from 'lucide-react';

const BottomNav = () => {
    const navStyle = ({ isActive }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
        transition: 'color 0.2s'
    });

    return (
        <div className="glass-panel mobile-only" style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '400px',
            height: '64px',
            borderRadius: '2rem', // Oval shape
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 100
        }}>
            <NavLink to="/" style={navStyle}>
                <Home size={24} />
            </NavLink>

            <NavLink to="/health" style={navStyle}>
                <Activity size={24} />
            </NavLink>

            <NavLink to="/profile" style={navStyle}>
                <User size={24} />
            </NavLink>
        </div>
    );
};

export default BottomNav;
