import React, { createContext, useContext, useState, useEffect } from 'react';

const MoodContext = createContext();

export const useMood = () => useContext(MoodContext);

const MOOD_MAP = {
    '🙂': 'happy',
    '😔': 'sad',
    '😡': 'angry',
    '😴': 'exhausted',
    '😐': 'normal',
    '😒': 'bored'
};

const MOOD_STRESS_SCORES = {
    'happy': 1,
    'normal': 2,
    'bored': 3,
    'sad': 4,
    'exhausted': 4,
    'angry': 5
};

export const MoodProvider = ({ children }) => {
    const [moodHistory, setMoodHistory] = useState([]);
    const [currentMood, setCurrentMood] = useState(null);

    // Load mood history from localStorage on mount
    useEffect(() => {
        const storedMoods = localStorage.getItem('vibecraft_moods');
        if (storedMoods) {
            setMoodHistory(JSON.parse(storedMoods));
        }
    }, []);

    // Save mood history to localStorage whenever it changes
    useEffect(() => {
        if (moodHistory.length > 0) {
            localStorage.setItem('vibecraft_moods', JSON.stringify(moodHistory));
        }
    }, [moodHistory]);

    const logMood = (emoji) => {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().slice(0, 5);
        const timestamp = now.getTime();

        const mood = MOOD_MAP[emoji] || 'unknown';

        const moodEntry = {
            id: timestamp,
            emoji,
            mood,
            date,
            time,
            timestamp
        };

        setMoodHistory(prev => [moodEntry, ...prev]);
        setCurrentMood(emoji);

        return {
            success: true,
            message: `Mood logged ${emoji}`
        };
    };

    const getMoodsByDate = (targetDate) => {
        return moodHistory.filter(entry => entry.date === targetDate);
    };

    const getMoodPatterns = () => {
        const patterns = {
            happy: 0,
            sad: 0,
            angry: 0,
            exhausted: 0,
            normal: 0,
            bored: 0
        };

        moodHistory.forEach(entry => {
            if (patterns[entry.mood] !== undefined) {
                patterns[entry.mood]++;
            }
        });

        return patterns;
    };

    const getMoodDataForChart = (days = 7) => {
        const now = new Date();
        const chartData = [];

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const dayMoods = getMoodsByDate(dateStr);

            if (dayMoods.length > 0) {
                // Use the most recent mood of the day
                const mood = dayMoods[0].mood;

                // Convert mood to stress level (for chart)
                const stressLevel = {
                    happy: 20,
                    normal: 40,
                    bored: 50,
                    exhausted: 60,
                    sad: 70,
                    angry: 85
                }[mood] || 40;

                chartData.push({
                    date: dateStr,
                    value: stressLevel,
                    mood: mood,
                    emoji: dayMoods[0].emoji
                });
            } else {
                // No mood logged for this day
                chartData.push({
                    date: dateStr,
                    value: null,
                    mood: null,
                    emoji: null
                });
            }
        }

        return chartData;
    };

    const getTodaysMood = () => {
        const today = new Date().toISOString().split('T')[0];
        const todayMoods = getMoodsByDate(today);
        return todayMoods.length > 0 ? todayMoods[0] : null;
    };

    const getWeeklyImprovementScore = (weekStartDate, rewardsContext) => {
        // Calculate improvement score for a specific week (0-100)
        const weekStart = new Date(weekStartDate);
        let totalScore = 0;

        // Get all 7 days of the week
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + i);
            weekDates.push(date.toISOString().split('T')[0]);
        }

        // 1. Habit Consistency Score (40 points max)
        let journalDays = 0;
        let breatheDays = 0;

        if (rewardsContext && rewardsContext.rewardHistory) {
            weekDates.forEach(dateStr => {
                const hasJournal = rewardsContext.rewardHistory.some(
                    r => r.date === dateStr && (r.taskName === 'Journal' || r.taskName === 'Journal (Retroactive)')
                );
                const hasBreathe = rewardsContext.rewardHistory.some(
                    r => r.date === dateStr && r.taskName === 'Breathe'
                );
                if (hasJournal) journalDays++;
                if (hasBreathe) breatheDays++;
            });
        }

        const habitScore = Math.min(40, journalDays * 3 + breatheDays * 3);
        totalScore += habitScore;

        // 2. Positive Mood Score (40 points max)
        let moodScore = 0;
        weekDates.forEach(dateStr => {
            const dayMoods = getMoodsByDate(dateStr);
            if (dayMoods.length > 0) {
                const mood = dayMoods[0].mood;
                // Positive moods contribute more
                if (mood === 'happy') moodScore += 6;
                else if (mood === 'normal') moodScore += 4;
                else if (mood === 'bored') moodScore += 2;
                // sad, angry, exhausted contribute 0
            }
        });

        moodScore = Math.min(40, moodScore);
        totalScore += moodScore;

        // 3. Improvement Trend (20 points max)
        // Calculate positive mood ratio for this week
        const weekMoods = weekDates.flatMap(d => getMoodsByDate(d));
        const positiveMoods = weekMoods.filter(m => m.mood === 'happy' || m.mood === 'normal').length;
        const currentRatio = weekMoods.length > 0 ? positiveMoods / weekMoods.length : 0;

        // Get previous week's ratio
        const prevWeekStart = new Date(weekStart);
        prevWeekStart.setDate(prevWeekStart.getDate() - 7);
        const prevWeekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(prevWeekStart);
            date.setDate(date.getDate() + i);
            prevWeekDates.push(date.toISOString().split('T')[0]);
        }
        const prevWeekMoods = prevWeekDates.flatMap(d => getMoodsByDate(d));
        const prevPositiveMoods = prevWeekMoods.filter(m => m.mood === 'happy' || m.mood === 'normal').length;
        const prevRatio = prevWeekMoods.length > 0 ? prevPositiveMoods / prevWeekMoods.length : 0;

        let improvementScore = 10; // baseline
        if (currentRatio > prevRatio) improvementScore = 20; // improved!
        else if (currentRatio === prevRatio && currentRatio > 0) improvementScore = 10; // maintained

        totalScore += improvementScore;

        return Math.round(totalScore);
    };

    const getImprovementDataForMonth = (rewardsContext) => {
        const now = new Date();
        const monthData = [];

        // Get last 4 weeks
        for (let weekNum = 3; weekNum >= 0; weekNum--) {
            const weekStart = new Date(now);
            weekStart.setDate(weekStart.getDate() - (weekNum * 7) - (now.getDay())); // Start from Sunday
            const weekStartStr = weekStart.toISOString().split('T')[0];

            const score = getWeeklyImprovementScore(weekStartStr, rewardsContext);

            monthData.push({
                weekLabel: `Week ${4 - weekNum}`,
                score: score,
                date: weekStartStr
            });
        }

        return monthData;
    };

    const value = {
        moodHistory,
        currentMood,
        logMood,
        getMoodsByDate,
        getMoodPatterns,
        getMoodDataForChart,
        getTodaysMood,
        getWeeklyImprovementScore,
        getImprovementDataForMonth
    };

    return (
        <MoodContext.Provider value={value}>
            {children}
        </MoodContext.Provider>
    );
};
