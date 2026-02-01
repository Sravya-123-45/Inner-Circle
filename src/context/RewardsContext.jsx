import React, { createContext, useContext, useState, useEffect } from 'react';

const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

export const RewardsProvider = ({ children }) => {
    const [totalCoins, setTotalCoins] = useState(0);
    const [journalCompleted, setJournalCompleted] = useState(false);
    const [breatheCompleted, setBreatheCompleted] = useState(false);
    const [rewardHistory, setRewardHistory] = useState([]);
    const [lastJournalDate, setLastJournalDate] = useState(null);
    const [lastBreatheDate, setLastBreatheDate] = useState(null);
    const [journalEntriesMigrated, setJournalEntriesMigrated] = useState(false);

    // Load state from localStorage on mount
    useEffect(() => {
        const storedRewards = localStorage.getItem('vibecraft_rewards');
        if (storedRewards) {
            const data = JSON.parse(storedRewards);
            setTotalCoins(data.totalCoins || 0);
            setRewardHistory(data.rewardHistory || []);
            setLastJournalDate(data.lastJournalDate || null);
            setLastBreatheDate(data.lastBreatheDate || null);
            setJournalEntriesMigrated(data.journalEntriesMigrated || false);

            // Check if we need to reset daily completion
            const today = new Date().toISOString().split('T')[0];
            setJournalCompleted(data.lastJournalDate === today);
            setBreatheCompleted(data.lastBreatheDate === today);
        }
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        const data = {
            totalCoins,
            rewardHistory,
            lastJournalDate,
            lastBreatheDate,
            journalEntriesMigrated
        };
        localStorage.setItem('vibecraft_rewards', JSON.stringify(data));
    }, [totalCoins, rewardHistory, lastJournalDate, lastBreatheDate]);

    const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().slice(0, 5);
        return { date, time };
    };

    const addJournalReward = () => {
        const today = new Date().toISOString().split('T')[0];

        // Check if already completed today
        if (lastJournalDate === today) {
            return {
                success: false,
                message: 'Entry saved! 📝 (Already earned today\'s reward)',
                alreadyCompleted: true
            };
        }

        // Award coins
        const { date, time } = getCurrentDateTime();
        const newReward = {
            id: Date.now(),
            taskName: 'Journal',
            coins: 10,
            date,
            time
        };

        setTotalCoins(prev => prev + 10);
        setRewardHistory(prev => [newReward, ...prev]);
        setLastJournalDate(today);
        setJournalCompleted(true);

        return {
            success: true,
            message: 'Journal completed 🎉 +10 coins earned!',
            coins: 10,
            alreadyCompleted: false
        };
    };

    const addBreatheReward = () => {
        const today = new Date().toISOString().split('T')[0];

        // Check if already completed today
        if (lastBreatheDate === today) {
            return {
                success: false,
                message: 'You\'ve already earned today\'s breathing reward! 🌿',
                alreadyCompleted: true
            };
        }

        // Award coins
        const { date, time } = getCurrentDateTime();
        const newReward = {
            id: Date.now(),
            taskName: 'Breathe',
            coins: 5,
            date,
            time
        };

        setTotalCoins(prev => prev + 5);
        setRewardHistory(prev => [newReward, ...prev]);
        setLastBreatheDate(today);
        setBreatheCompleted(true);

        return {
            success: true,
            message: 'Great breathing session 🌿 +5 coins earned!',
            coins: 5,
            alreadyCompleted: false
        };
    };

    const migrateJournalEntries = (entries) => {
        // Only migrate once
        if (journalEntriesMigrated || !entries || entries.length === 0) {
            return {
                success: false,
                message: 'Migration already completed or no entries to migrate'
            };
        }

        // Award 10 coins per existing entry
        const coinsToAdd = entries.length * 10;
        const { date, time } = getCurrentDateTime();

        // Create a single migration reward entry
        const migrationReward = {
            id: Date.now(),
            taskName: 'Journal (Retroactive)',
            coins: coinsToAdd,
            date,
            time,
            isMigration: true
        };

        setTotalCoins(prev => prev + coinsToAdd);
        setRewardHistory(prev => [migrationReward, ...prev]);
        setJournalEntriesMigrated(true);

        return {
            success: true,
            message: `Awarded ${coinsToAdd} coins for ${entries.length} existing journal entries`,
            coins: coinsToAdd
        };
    };

    const value = {
        totalCoins,
        journalCompleted,
        breatheCompleted,
        rewardHistory,
        journalEntriesMigrated,
        addJournalReward,
        addBreatheReward,
        migrateJournalEntries
    };

    return (
        <RewardsContext.Provider value={value}>
            {children}
        </RewardsContext.Provider>
    );
};
