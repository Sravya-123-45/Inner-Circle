import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ArrowLeft, Save, Calendar, Clock, BookOpen, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRewards } from '../context/RewardsContext';

const Journal = () => {
    const navigate = useNavigate();
    const { addJournalReward, migrateJournalEntries } = useRewards();

    // Load entries from localStorage or use default
    const [entries, setEntries] = useState(() => {
        const stored = localStorage.getItem('vibecraft_journal_entries');
        if (stored) {
            return JSON.parse(stored);
        }
        // Default entry for first-time users
        return [{
            id: 1,
            date: '2026-01-31',
            time: '14:30',
            title: 'My First Entry',
            content: 'Today was a great day. I felt calm and focused throughout the afternoon...'
        }];
    });

    const [currentEntry, setCurrentEntry] = useState({
        title: '',
        content: ''
    });
    const [selectedEntryId, setSelectedEntryId] = useState(null);

    // Save entries to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('vibecraft_journal_entries', JSON.stringify(entries));
    }, [entries]);

    // Migrate existing entries on first load
    useEffect(() => {
        if (entries.length > 0) {
            migrateJournalEntries(entries);
        }
    }, []); // Empty dependency array - only run once on mount

    const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().slice(0, 5);
        return { date, time };
    };

    const handleSaveEntry = () => {
        if (!currentEntry.title.trim() && !currentEntry.content.trim()) {
            alert('Please write something before saving!');
            return;
        }

        const { date, time } = getCurrentDateTime();
        const newEntry = {
            id: Date.now(),
            date,
            time,
            title: currentEntry.title || 'Untitled Entry',
            content: currentEntry.content
        };

        setEntries([newEntry, ...entries]);
        setCurrentEntry({ title: '', content: '' });

        // Add reward for journaling
        const result = addJournalReward();
        alert(result.message);
    };

    const handleDeleteEntry = (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            setEntries(entries.filter(entry => entry.id !== id));
            if (selectedEntryId === id) {
                setSelectedEntryId(null);
            }
        }
    };

    const handleSelectEntry = (entry) => {
        setSelectedEntryId(entry.id);
        setCurrentEntry({
            title: entry.title,
            content: entry.content
        });
    };

    return (
        <Layout>
            <div className="page-padding" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <ArrowLeft onClick={() => navigate('/')} style={{ cursor: 'pointer' }} size={24} />
                        <div>
                            <h1 style={{ margin: 0, fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <BookOpen size={28} color="var(--primary-color)" />
                                My Journal
                            </h1>
                            <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                Write your thoughts, feelings, and daily reflections
                            </p>
                        </div>
                    </div>
                </div>

                {/* Journal Grid */}
                <div className="journal-grid" style={{ display: 'grid', gap: '2rem' }}>

                    {/* Left: Note Editor */}
                    <div className="glass-panel" style={{
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        height: 'calc(100vh - 200px)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>New Entry</h3>
                            <button
                                onClick={handleSaveEntry}
                                style={{
                                    background: 'var(--primary-gradient)',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <Save size={18} />
                                Save Entry
                            </button>
                        </div>

                        {/* Title Input */}
                        <input
                            type="text"
                            placeholder="Entry title..."
                            value={currentEntry.title}
                            onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                marginBottom: '1rem',
                                color: 'var(--text-primary)'
                            }}
                        />

                        {/* Content Textarea */}
                        <textarea
                            placeholder="Start writing your thoughts..."
                            value={currentEntry.content}
                            onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                            style={{
                                flex: 1,
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(0,0,0,0.1)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.95rem',
                                lineHeight: '1.6',
                                resize: 'none',
                                fontFamily: 'inherit',
                                color: 'var(--text-primary)'
                            }}
                        />

                        {/* Character Count */}
                        <div style={{ marginTop: '1rem', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            {currentEntry.content.length} characters
                        </div>
                    </div>

                    {/* Right: Previous Entries */}
                    <div className="glass-panel" style={{
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        height: 'calc(100vh - 200px)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}>
                        <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.1rem' }}>
                            Previous Entries ({entries.length})
                        </h3>

                        {/* Entries List */}
                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {entries.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    color: 'var(--text-muted)',
                                    padding: '3rem 1rem',
                                    border: '2px dashed var(--border-color)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    <BookOpen size={48} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                                    <p>No entries yet. Start writing your first journal entry!</p>
                                </div>
                            ) : (
                                entries.map((entry) => (
                                    <div
                                        key={entry.id}
                                        onClick={() => handleSelectEntry(entry)}
                                        style={{
                                            padding: '1.25rem',
                                            background: selectedEntryId === entry.id ? 'rgba(99, 102, 241, 0.1)' : 'rgba(0,0,0,0.2)',
                                            border: `1px solid ${selectedEntryId === entry.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (selectedEntryId !== entry.id) {
                                                e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (selectedEntryId !== entry.id) {
                                                e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
                                            }
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
                                                {entry.title}
                                            </h4>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteEntry(entry.id);
                                                }}
                                                style={{
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    color: '#ef4444',
                                                    border: 'none',
                                                    padding: '0.4rem',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    transition: 'background 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Calendar size={12} />
                                                {entry.date}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Clock size={12} />
                                                {entry.time}
                                            </span>
                                        </div>

                                        <p style={{
                                            margin: 0,
                                            fontSize: '0.85rem',
                                            color: 'var(--text-secondary)',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {entry.content}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive Styles */}
            <style>{`
                .journal-grid {
                    grid-template-columns: 1fr;
                }

                @media (min-width: 1024px) {
                    .journal-grid {
                        grid-template-columns: 1.2fr 1fr;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default Journal;
