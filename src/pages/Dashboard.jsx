import React, { useState } from 'react';
import Layout from '../components/Layout';
import StressChart from '../components/StressChart';
import { Watch, Smile, Lightbulb, Mic, TrendingUp, Book, Wind, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMood } from '../context/MoodContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { logMood, getTodaysMood } = useMood();
    const [showToast, setShowToast] = useState(false);
    const [toastEmoji, setToastEmoji] = useState('');
    const todayMood = getTodaysMood();

    const handleMoodClick = (emoji) => {
        logMood(emoji);
        setToastEmoji(emoji);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <Layout>
            <div className="page-padding">
                {/* Header - kept common */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Hello, User</h1>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>How are you feeling today?</p>
                    </div>
                    <div
                        onClick={() => navigate('/chat')}
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'var(--bg-card)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--border-color)',
                            cursor: 'pointer'
                        }}>
                        <Mic size={24} color="var(--primary-color)" />
                    </div>
                </div>

                {/* Dashboard Grid Container */}
                <div className="dashboard-grid">

                    {/* Column 1: Watch & Moods */}
                    <div className="grid-col-1">
                        {/* Watch Connection Widget */}
                        <div className="glass-panel" style={{
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{ padding: '0.75rem', background: 'rgba(52, 211, 153, 0.2)', borderRadius: '50%' }}>
                                <Watch size={28} color="#34d399" />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1rem' }}>Watch Model</h3>
                                <p style={{ margin: '0.25rem 0 0', color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>Connection Success 100%</p>
                            </div>
                        </div>

                        {/* Log Moods */}
                        <div className="glass-panel" style={{
                            padding: '1.25rem',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            position: 'relative'
                        }}>
                            <h3 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Log Moods</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                                {['🙂', '😔', '😡', '😴', '😐', '😒'].map((emoji, i) => {
                                    const isSelected = todayMood && todayMood.emoji === emoji;
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => handleMoodClick(emoji)}
                                            style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(0,0,0,0.03)',
                                                border: isSelected ? '2px solid #6366f1' : '2px solid transparent',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.25rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                boxShadow: isSelected ? '0 0 12px rgba(99, 102, 241, 0.3)' : 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'scale(1.15)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        >
                                            {emoji}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Toast Notification */}
                            {showToast && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '0.5rem',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'rgba(16, 185, 129, 0.95)',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    animation: 'slideUp 0.3s ease-out',
                                    zIndex: 10
                                }}>
                                    Mood logged {toastEmoji}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Stress Timeline (Main Focus) */}
                    <div className="grid-col-2">
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <TrendingUp size={20} />
                                    Stress Timeline
                                </h3>
                            </div>
                            <div style={{ height: '300px' }}> {/* Increased height for desktop */}
                                <StressChart />
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Instant Actions & Quick Links (Expanded) */}
                    <div className="grid-col-3" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>

                        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-secondary)' }}>Quick Actions</h3>

                        {/* 2x2 Grid for Actions */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gridTemplateRows: '1fr 1fr',
                            gap: '1rem',
                            flex: 1
                        }}>
                            {/* Action 1: Journal */}
                            <div
                                onClick={() => navigate('/journal')}
                                className="glass-panel"
                                style={{
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    background: '#FFF0F5', /* Light Pink Tint */
                                    border: '1px solid #FBCFE8',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(236, 72, 153, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <Book size={24} color="#EC4899" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#DB2777' }}>Journal</span>
                            </div>

                            {/* Action 2: Breathe */}
                            <div
                                onClick={() => navigate('/breathe')}
                                className="glass-panel"
                                style={{
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    background: '#F0FDFA', /* Light Teal Tint */
                                    border: '1px solid #CCFBF1',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(20, 184, 166, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <Wind size={24} color="#14B8A6" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0D9488' }}>Breathe</span>
                            </div>

                            {/* Action 3: Reward (Previously Connect) */}
                            <div
                                onClick={() => navigate('/rewards')}
                                className="glass-panel"
                                style={{
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    background: '#EFF6FF', /* Light Blue Tint */
                                    border: '1px solid #BFDBFE',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <Trophy size={24} color="#3B82F6" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2563EB' }}>Reward</span>
                            </div>

                            {/* Action 4: Instant Action (Previously Help) */}
                            <div
                                onClick={() => navigate('/chat')}
                                className="glass-panel"
                                style={{
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    background: '#FEF2F2', /* Light Red Tint */
                                    border: '1px solid #FECACA',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <Lightbulb size={24} color="#EF4444" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#DC2626' }}>Instant Action</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
