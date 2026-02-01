import React from 'react';
import Layout from '../components/Layout';
import StressManagementChart from '../components/StressManagementChart';
import { Heart, Moon, Activity, TrendingUp, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Health = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="page-padding">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <ArrowLeft onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Health Overview</h1>
                        <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)' }}>Real-time metrics from your connected devices</p>
                    </div>
                </div>

                {/* 3-Column Grid for Desktop, Single Column for Mobile */}
                <div className="health-grid">

                    {/* Column 1: Heart & Sleep Monitor */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
                        {/* Heart Rate Card */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <Heart size={16} color="#ef4444" />
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>HEART RATE</span>
                                    </div>
                                    <div style={{ marginTop: '0.25rem' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '-1px' }}>72</span>
                                        <span style={{ color: 'var(--text-muted)', marginLeft: '4px', fontSize: '1rem' }}>bpm</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <TrendingUp size={12} /> Normal
                                    </p>
                                </div>
                                <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%' }}>
                                    <Activity size={24} color="#ef4444" style={{ animation: 'pulse 1.5s infinite' }} />
                                </div>
                            </div>
                            {/* Detailed Graph Visualization */}
                            <div style={{ marginTop: '1rem', height: '30%', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                                {[25, 35, 20, 45, 30, 40, 25, 50, 35, 30, 45, 40, 35, 55, 45, 30, 40, 50, 45, 30].map((h, i) => (
                                    <div key={i} style={{
                                        flex: 1,
                                        height: `${h}%`,
                                        background: i === 18 ? '#ef4444' : 'rgba(239, 68, 68, 0.3)',
                                        borderRadius: '2px',
                                    }}></div>
                                ))}
                            </div>
                        </div>

                        {/* Sleep Monitor Card */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <Moon size={16} color="#6366f1" />
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SLEEP</span>
                                    </div>
                                    <div style={{ marginTop: '0.25rem' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '-1px' }}>7</span>
                                        <span style={{ fontSize: '1rem', fontWeight: 'bold', marginLeft: '2px', color: 'var(--text-muted)' }}>h</span>
                                        <span style={{ fontSize: '2rem', fontWeight: 'bold', marginLeft: '6px', letterSpacing: '-1px' }}>42</span>
                                        <span style={{ fontSize: '1rem', fontWeight: 'bold', marginLeft: '2px', color: 'var(--text-muted)' }}>m</span>
                                    </div>
                                </div>
                                <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%' }}>
                                    <Moon size={24} color="#6366f1" />
                                </div>
                            </div>

                            {/* Sleep Stages Mini-Viz */}
                            <div style={{ width: '100%', marginTop: 'auto' }}>
                                <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                                    <div style={{ width: '15%', background: '#fbbf24' }} title="Awake"></div>
                                    <div style={{ width: '45%', background: '#6366f1' }} title="Light"></div>
                                    <div style={{ width: '25%', background: '#4338ca' }} title="Deep"></div>
                                    <div style={{ width: '15%', background: '#a5b4fc' }} title="REM"></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Awake 15%</span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Deep 25%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Stress Management Progress */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>

                        {/* Stress Management Progress Widget */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Stress Management Progress</h3>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                                Your ability to manage stress has improved through healthy daily habits.
                            </p>
                            <p style={{ margin: '0 0 1rem 0', fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic', opacity: 0.7 }}>
                                This view focuses on progress, not pressure.
                            </p>
                            <div style={{ flex: 1, minHeight: '150px' }}>
                                <StressManagementChart />
                            </div>
                        </div>

                        {/* Additional Insight or Metric */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1rem' }}>Stress Levels</h3>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily Fluctuation</p>
                            </div>
                            <div style={{ height: '60%', width: '100%', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} style={{
                                        flex: 1,
                                        height: `${30 + Math.random() * 50}%`,
                                        background: `hsl(${200 + i * 5}, 70%, 60%)`,
                                        opacity: 0.5,
                                        borderRadius: '2px'
                                    }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Insights & Score */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>

                        {/* Recovery Insight */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(16, 185, 129, 0.1)', flexBasis: '25%' }}>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <div style={{ padding: '0.4rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '6px', height: 'fit-content' }}>
                                    <Info size={16} color="#10b981" />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#10b981' }}>Recovery Insight</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginTop: '0.25rem' }}>
                                        Your sleep quality has improved by <strong>14%</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Overall Score */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Health Score</h3>
                            <div style={{
                                width: '140px',
                                height: '140px',
                                borderRadius: '50%',
                                border: '8px solid var(--bg-secondary)',
                                borderTopColor: '#10b981',
                                borderRightColor: '#10b981',
                                borderBottomColor: '#10b981',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>85</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Good</span>
                            </div>
                            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem', maxWidth: '80%' }}>Combined biometric score.</p>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </Layout>
    );
};

export default Health;
