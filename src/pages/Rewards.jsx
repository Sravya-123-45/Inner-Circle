import React from 'react';
import Layout from '../components/Layout';
import { ArrowLeft, Trophy, Coins, BookOpen, Wind, CheckCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRewards } from '../context/RewardsContext';

const Rewards = () => {
    const navigate = useNavigate();
    const { totalCoins, journalCompleted, breatheCompleted, rewardHistory } = useRewards();

    return (
        <Layout>
            <div className="page-padding" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <ArrowLeft onClick={() => navigate('/')} style={{ cursor: 'pointer' }} size={24} />
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Trophy size={28} color="#F59E0B" />
                            Your Rewards
                        </h1>
                        <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Track your progress and earn coins for healthy habits
                        </p>
                    </div>
                </div>

                {/* Coin Balance Card */}
                <div className="glass-panel" style={{
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)',
                    border: '2px solid rgba(245, 158, 11, 0.2)',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        borderRadius: '50%',
                        marginBottom: '1rem',
                        boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)'
                    }}>
                        <Coins size={40} color="white" />
                    </div>
                    <h2 style={{ margin: '0 0 0.5rem', fontSize: '3rem', fontWeight: 'bold', color: '#F59E0B' }}>
                        {totalCoins}
                    </h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 600 }}>
                        Total Coins Earned
                    </p>
                    <p style={{ margin: '1rem 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Keep building your streak! Every small step counts 🌟
                    </p>
                </div>

                {/* Today's Progress */}
                <div className="glass-panel" style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '2rem'
                }}>
                    <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.1rem' }}>Today's Progress</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {/* Journal Progress */}
                        <div style={{
                            padding: '1.25rem',
                            background: journalCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0.1)',
                            border: `1px solid ${journalCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-color)'}`,
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: journalCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {journalCompleted ? (
                                    <CheckCircle size={24} color="#10b981" />
                                ) : (
                                    <Lock size={24} color="var(--text-muted)" />
                                )}
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Journal</h4>
                                <p style={{
                                    margin: '0.25rem 0 0',
                                    fontSize: '0.8rem',
                                    color: journalCompleted ? '#10b981' : 'var(--text-muted)',
                                    fontWeight: 600
                                }}>
                                    {journalCompleted ? '✓ Completed +10 coins' : 'Not completed yet'}
                                </p>
                            </div>
                        </div>

                        {/* Breathing Progress */}
                        <div style={{
                            padding: '1.25rem',
                            background: breatheCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0.1)',
                            border: `1px solid ${breatheCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-color)'}`,
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: breatheCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {breatheCompleted ? (
                                    <CheckCircle size={24} color="#10b981" />
                                ) : (
                                    <Lock size={24} color="var(--text-muted)" />
                                )}
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Breathe</h4>
                                <p style={{
                                    margin: '0.25rem 0 0',
                                    fontSize: '0.8rem',
                                    color: breatheCompleted ? '#10b981' : 'var(--text-muted)',
                                    fontWeight: 600
                                }}>
                                    {breatheCompleted ? '✓ Completed +5 coins' : 'Not completed yet'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reward History */}
                <div className="glass-panel" style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)'
                }}>
                    <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.1rem' }}>
                        Reward History ({rewardHistory.length})
                    </h3>

                    {rewardHistory.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem 1rem',
                            color: 'var(--text-muted)'
                        }}>
                            <Trophy size={48} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                            <p>No rewards yet. Start journaling or practice breathing to earn your first coins!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto' }}>
                            {rewardHistory.map((reward) => (
                                <div
                                    key={reward.id}
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(0,0,0,0.1)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '1rem',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: reward.taskName === 'Journal' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(20, 184, 166, 0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.25rem'
                                        }}>
                                            {reward.taskName === 'Journal' ? (
                                                <BookOpen size={20} color="#EC4899" />
                                            ) : (
                                                <Wind size={20} color="#14B8A6" />
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                                                {reward.taskName}
                                            </h4>
                                            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                {reward.date} at {reward.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '0.5rem 1rem',
                                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        color: '#F59E0B',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        +{reward.coins} 🪙
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Rewards;
