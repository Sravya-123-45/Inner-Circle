import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMood } from '../context/MoodContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const StressChart = () => {
    const { getMoodDataForChart } = useMood();
    const moodData = getMoodDataForChart(7);

    // Define mood colors
    const moodColors = {
        happy: { border: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', point: '#10b981' },
        normal: { border: '#6B7280', bg: 'rgba(107, 116, 128, 0.15)', point: '#6B7280' },
        bored: { border: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)', point: '#F59E0B' },
        exhausted: { border: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.15)', point: '#8B5CF6' },
        sad: { border: '#3B82F6', bg: 'rgba(59, 130, 246, 0.15)', point: '#3B82F6' },
        angry: { border: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)', point: '#EF4444' }
    };

    // Get day label
    const getDayLabel = (dateStr) => {
        const date = new Date(dateStr);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date.getDay()];
    };

    const labels = moodData.map(item => getDayLabel(item.date));

    // Check if we have any mood data
    const hasMoodData = moodData.some(item => item.value !== null);

    // Prepare chart data
    const dataValues = hasMoodData
        ? moodData.map(item => item.value || 40)
        : [4, 3, 6, 2, 5, 3, 4].map(val => val * 10); // Mock data fallback

    // Point colors based on mood
    const pointColors = hasMoodData
        ? moodData.map(item => {
            if (!item.mood) return '#7B8CFF';
            return moodColors[item.mood]?.point || '#7B8CFF';
        })
        : Array(7).fill('#7B8CFF');

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        if (hasMoodData && moodData[context.dataIndex].mood) {
                            const mood = moodData[context.dataIndex].mood;
                            const emoji = moodData[context.dataIndex].emoji;
                            return `Mood: ${emoji} ${mood}`;
                        }
                        return `Stress Level: ${context.parsed.y}`;
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#9CA3AF'
                }
            },
            y: {
                display: false,
                min: 0,
                max: 100,
            }
        },
        elements: {
            line: {
                tension: 0.4
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: hasMoodData ? 'Mood Pattern' : 'Stress Level',
                data: dataValues,
                borderColor: hasMoodData ? '#6366f1' : '#7B8CFF',
                backgroundColor: hasMoodData ? 'rgba(99, 102, 241, 0.15)' : 'rgba(123, 140, 255, 0.15)',
                fill: true,
                pointBackgroundColor: pointColors,
                pointBorderColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 8,
            },
        ],
    };

    return <Line options={options} data={data} />;
};

export default StressChart;
