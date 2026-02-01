import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { Send, ArrowLeft, Bot, Mic, Info, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi User! I am Your Personal Chatbot. I want You to Share Your Daily Routine!", sender: 'bot' },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newUserMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        setIsTyping(true);

        // Mock Bot Response
        setTimeout(() => {
            const botResponses = [
                "That sounds interesting. Tell me more!",
                "I understand how that can be stressful. How are you coping?",
                "Remember to take deep breaths. You're doing great.",
                "I have recorded that in your mood log.",
                "Is there anything else on your mind?",
                "Great! I've prepared some breathing exercises for you."
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const newBotMsg = { id: Date.now() + 1, text: randomResponse, sender: 'bot' };
            setMessages(prev => [...prev, newBotMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <Layout>
            <div className="chat-layout-wrapper" style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 4rem)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <ArrowLeft onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Personal Chatbot</h2>
                </div>

                <div className="chat-grid-container" style={{ flex: 1, minHeight: 0 }}>

                    {/* Main Chat Area */}
                    <div className="chat-interface glass-panel" style={{
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        height: '100%'
                    }}>
                        {/* Chat Header */}
                        <div style={{
                            padding: '1rem',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            background: 'rgba(0,0,0,0.2)'
                        }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1rem' }}>VibeBot</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Always here for you</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map((msg) => (
                                <div key={msg.id} style={{
                                    display: 'flex',
                                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                }}>
                                    <div style={{
                                        maxWidth: '75%',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '1.5rem',
                                        borderTopRightRadius: msg.sender === 'user' ? '4px' : '1.5rem',
                                        borderTopLeftRadius: msg.sender === 'bot' ? '4px' : '1.5rem',
                                        background: msg.sender === 'user' ? 'var(--primary-color)' : 'var(--bg-secondary)',
                                        color: 'white',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '1rem', display: 'flex', gap: '4px' }}>
                                        <span className="dot" style={{ animation: 'bounce 1s infinite' }}>.</span>
                                        <span className="dot" style={{ animation: 'bounce 1s infinite 0.2s' }}>.</span>
                                        <span className="dot" style={{ animation: 'bounce 1s infinite 0.4s' }}>.</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.1)' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.5rem',
                                background: 'var(--bg-primary)',
                                borderRadius: '3rem',
                                border: '1px solid var(--border-color)',
                                gap: '0.5rem'
                            }}>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    style={{ flex: 1, border: 'none', padding: '0.75rem 1.5rem', background: 'transparent' }}
                                />
                                <button style={{ padding: '0.5rem', background: 'none' }}>
                                    <Mic size={20} color="var(--text-muted)" />
                                </button>
                                <button
                                    onClick={handleSend}
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '50%',
                                        background: 'var(--primary-gradient)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        marginRight: '4px'
                                    }}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Context Panel (Desktop Only via CSS or Layout) */}
                    <div className="context-panel desktop-only" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Daily Tips */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>
                                <Sparkles size={20} />
                                <h3 style={{ margin: 0, fontSize: '1rem' }}>Daily Insight</h3>
                            </div>
                            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                                "Consistency is key. Even a 5-minute check-in can significantly improve your mindfulness over time."
                            </p>
                        </div>

                        {/* Recent Moods */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
                                <TrendingUp size={20} />
                                <h3 style={{ margin: 0, fontSize: '1rem' }}>Mood Stability</h3>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.85rem' }}>This Week</span>
                                <span style={{ fontWeight: 'bold', color: '#10b981' }}>+12%</span>
                            </div>
                            <div style={{ height: '4px', background: 'var(--bg-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: '75%', height: '100%', background: 'var(--primary-gradient)' }}></div>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', flex: 1, backgroundImage: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(0,0,0,0) 100%)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <Info size={20} />
                                <h3 style={{ margin: 0, fontSize: '1rem' }}>Quick Actions</h3>
                            </div>
                            <button style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-primary)',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                textAlign: 'left'
                            }}>
                                Start Breathing Exercise
                            </button>
                            <button style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-primary)',
                                fontSize: '0.9rem',
                                textAlign: 'left'
                            }}>
                                View Weekly Report
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Chat;
