import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ArrowLeft, Wind, Heart, Sparkles, CloudRain, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRewards } from '../context/RewardsContext';

const Breathe = () => {
    const navigate = useNavigate();
    const { breatheCompleted, addBreatheReward } = useRewards();
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);
    const [phase, setPhase] = useState(0);
    const [cycleCount, setCycleCount] = useState(0);
    const [canComplete, setCanComplete] = useState(false);

    const exercises = [
        {
            id: 'diaphragmatic',
            title: 'Diaphragmatic Breathing',
            icon: Heart,
            color: '#EC4899',
            bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.05) 100%)',
            description: 'Calms the nervous system',
            steps: [
                'Inhale through the nose for 4 counts (belly rises, chest still)',
                'Exhale through the mouth for 6–8 counts'
            ],
            duration: '5 minutes',
            phases: [
                { text: 'Breathe In (Nose)', duration: 4000, color: '#EC4899' },
                { text: 'Breathe Out (Mouth)', duration: 6000, color: '#DB2777' }
            ]
        },
        {
            id: 'box',
            title: 'Box Breathing',
            icon: Wind,
            color: '#14B8A6',
            bgGradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(13, 148, 136, 0.05) 100%)',
            description: 'Improves focus and emotional balance',
            steps: [
                'Inhale for 4',
                'Hold for 4',
                'Exhale for 4',
                'Hold for 4'
            ],
            duration: '4–5 cycles',
            phases: [
                { text: 'Breathe In', duration: 4000, color: '#14B8A6' },
                { text: 'Hold', duration: 4000, color: '#0D9488' },
                { text: 'Breathe Out', duration: 4000, color: '#14B8A6' },
                { text: 'Hold', duration: 4000, color: '#0D9488' }
            ]
        },
        {
            id: '478',
            title: '4–7–8 Breathing',
            icon: Sparkles,
            color: '#8B5CF6',
            bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)',
            description: 'Helpful for anxiety and sleep',
            steps: [
                'Inhale through nose for 4',
                'Hold for 7',
                'Exhale through mouth for 8 (whoosh sound)'
            ],
            duration: '4 cycles',
            phases: [
                { text: 'Breathe In (Nose)', duration: 4000, color: '#8B5CF6' },
                { text: 'Hold', duration: 7000, color: '#7C3AED' },
                { text: 'Breathe Out (Whoosh)', duration: 8000, color: '#8B5CF6' }
            ]
        },
        {
            id: 'cyclic',
            title: 'Cyclic Sighing',
            icon: CloudRain,
            color: '#3B82F6',
            bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
            description: 'Highly effective for anxiety relief',
            steps: [
                'Double inhale through the nose',
                'Long exhale through the mouth'
            ],
            duration: '5 minutes',
            phases: [
                { text: 'Inhale (1)', duration: 2000, color: '#3B82F6' },
                { text: 'Inhale (2)', duration: 2000, color: '#2563EB' },
                { text: 'Long Exhale', duration: 6000, color: '#3B82F6' }
            ]
        }
    ];

    const handleStartExercise = (exercise) => {
        setSelectedExercise(exercise);
        setShowAnimation(true);
        setPhase(0);
        setCycleCount(0);
        setCanComplete(false);
    };

    const handleComplete = () => {
        const result = addBreatheReward();
        alert(result.message);
        setShowAnimation(false);
        setSelectedExercise(null);
        setPhase(0);
        setCycleCount(0);
        setCanComplete(false);
    };

    const handleStop = () => {
        setShowAnimation(false);
        setSelectedExercise(null);
        setPhase(0);
        setCycleCount(0);
        setCanComplete(false);
    };

    // Animation logic
    React.useEffect(() => {
        let timer;
        if (showAnimation && selectedExercise) {
            timer = setTimeout(() => {
                const nextPhase = (phase + 1) % selectedExercise.phases.length;
                setPhase(nextPhase);

                if (nextPhase === 0) {
                    setCycleCount(prev => prev + 1);
                    if (cycleCount >= 0) {
                        setCanComplete(true);
                    }
                }
            }, selectedExercise.phases[phase].duration);
        }
        return () => clearTimeout(timer);
    }, [showAnimation, phase, cycleCount, selectedExercise]);

    const getCircleScale = () => {
        if (!selectedExercise) return 1;
        const currentPhase = selectedExercise.phases[phase].text.toLowerCase();
        if (currentPhase.includes('in') || currentPhase.includes('inhale')) return 1.5;
        if (currentPhase.includes('out') || currentPhase.includes('exhale')) return 1;
        return phase % 2 === 0 ? 1.5 : 1;
    };

    if (showAnimation && selectedExercise) {
        return (
            <Layout>
                <div className="page-padding" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <ArrowLeft onClick={handleStop} style={{ cursor: 'pointer' }} size={24} />
                        <div>
                            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{selectedExercise.title}</h1>
                            <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                Follow the breathing rhythm
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel" style={{
                        padding: '3rem 2rem',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center',
                        background: selectedExercise.bgGradient
                    }}>
                        {/* Breathing Circle */}
                        <div style={{
                            width: '250px',
                            height: '250px',
                            margin: '0 auto 2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${selectedExercise.phases[phase].color} 0%, ${selectedExercise.color} 100%)`,
                                boxShadow: `0 0 40px ${selectedExercise.phases[phase].color}40`,
                                transform: `scale(${getCircleScale()})`,
                                transition: `transform ${selectedExercise.phases[phase].duration}ms ease-in-out`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                padding: '1rem',
                                textAlign: 'center'
                            }}>
                                {selectedExercise.phases[phase].text}
                            </div>
                        </div>

                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Cycles completed: {cycleCount}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={handleStop}
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    padding: '1rem 2rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid #ef4444',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '1rem'
                                }}
                            >
                                Stop
                            </button>
                            <button
                                onClick={handleComplete}
                                disabled={!canComplete}
                                style={{
                                    background: canComplete ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'var(--bg-secondary)',
                                    color: canComplete ? 'white' : 'var(--text-muted)',
                                    padding: '1rem 2rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: 'none',
                                    cursor: canComplete ? 'pointer' : 'not-allowed',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    opacity: canComplete ? 1 : 0.5
                                }}
                            >
                                <CheckCircle size={20} />
                                Complete Exercise
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="page-padding" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <ArrowLeft onClick={() => navigate('/')} style={{ cursor: 'pointer' }} size={24} />
                        <div>
                            <h1 style={{ margin: 0, fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Wind size={28} color="#14B8A6" />
                                Breathing Exercises
                            </h1>
                            <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                Choose an exercise to reduce stress and improve focus
                            </p>
                        </div>
                    </div>

                    {/* Today's Status Badge */}
                    <div style={{
                        padding: '0.75rem 1.25rem',
                        background: breatheCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        border: `1px solid ${breatheCompleted ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: breatheCompleted ? '#10b981' : '#F59E0B'
                    }}>
                        {breatheCompleted ? '✓ Completed today (+5 coins)' : 'Not completed yet'}
                    </div>
                </div>

                {/* Exercise Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    {exercises.map((exercise) => {
                        const Icon = exercise.icon;
                        return (
                            <div
                                key={exercise.id}
                                className="glass-panel"
                                style={{
                                    padding: '1.75rem',
                                    borderRadius: 'var(--radius-lg)',
                                    background: exercise.bgGradient,
                                    border: `1px solid ${exercise.color}20`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}
                            >
                                {/* Icon and Title */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <div style={{
                                        padding: '0.75rem',
                                        background: `${exercise.color}20`,
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon size={24} color={exercise.color} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>
                                            {exercise.title}
                                        </h3>
                                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            {exercise.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Steps */}
                                <div>
                                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                                        Steps:
                                    </p>
                                    <ul style={{
                                        margin: 0,
                                        paddingLeft: '1.25rem',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-primary)',
                                        lineHeight: '1.6'
                                    }}>
                                        {exercise.steps.map((step, idx) => (
                                            <li key={idx}>{step}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Duration Badge */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 0.75rem',
                                    background: 'rgba(0,0,0,0.1)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    width: 'fit-content'
                                }}>
                                    <Clock size={14} />
                                    {exercise.duration}
                                </div>

                                {/* Start Button */}
                                <button
                                    onClick={() => handleStartExercise(exercise)}
                                    disabled={breatheCompleted}
                                    style={{
                                        background: breatheCompleted ? 'var(--bg-secondary)' : `linear-gradient(135deg, ${exercise.color} 0%, ${exercise.color}DD 100%)`,
                                        color: breatheCompleted ? 'var(--text-muted)' : 'white',
                                        padding: '0.875rem 1.5rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: 'none',
                                        cursor: breatheCompleted ? 'not-allowed' : 'pointer',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        transition: 'transform 0.2s',
                                        opacity: breatheCompleted ? 0.5 : 1,
                                        marginTop: 'auto'
                                    }}
                                    onMouseEnter={(e) => !breatheCompleted && (e.currentTarget.style.transform = 'translateY(-2px)')}
                                    onMouseLeave={(e) => !breatheCompleted && (e.currentTarget.style.transform = 'translateY(0)')}
                                >
                                    {breatheCompleted ? 'Completed Today' : 'Start Exercise'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Breathe;
