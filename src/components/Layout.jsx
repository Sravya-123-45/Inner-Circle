import React from 'react';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            {/* Desktop Sidebar - Hidden on Mobile via CSS */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="main-content">
                {children}

                {/* Mobile Bottom Nav - Hidden on Desktop via CSS */}
                <BottomNav />
            </div>
        </div>
    );
};

export default Layout;
