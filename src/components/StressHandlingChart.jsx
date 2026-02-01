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
import { useRewards } from '../context/RewardsContext';

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

const StressHandlingChart = () => {
    const moodContext = useMood();
    const rewardsContext = useRewards();

    // Get stress data for the week
    const weekData = moodContext.getStressDataForWeek(rewardsContext);

    // Extract labels and data
    const labels = weekData.map(day => day.label);
    const stressValues = weekData.map(day => day.stressLevel);

    // Create gradient colors based on stress levels
    const getPointColor = (stressLevel) => {
        if (stressLevel <= 2) return '#10b981'; // Green (low stress)
        if (stressLevel <= 3) return '#F59E0B'; // Yellow (medium stress)
        return '#ef4444'; // Red (high stress)
    };

    const pointColors = stressValues.map(val => getPointColor(val));

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        const stressLevel = context.parsed.y;
                        const labels = {
                            1: 'Very Low Stress',
                            2: 'Low Stress',
                            3: 'Moderate Stress',
                            4: 'High Stress',
                            5: 'Very High Stress'
                        };
                        return labels[stressLevel] || `Stress: ${stressLevel}`;
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
                    color: '#9CA3AF',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                min: 0.5,
                max: 5.5,
                reverse: true, // Low stress at top, high at bottom
                ticks: {
                    stepSize: 1,
                    color: '#9CA3AF',
                    font: {
                        size: 10
                    },
                    callback: function (value) {
                        if (value === 1) return 'Low';
                        if (value === 3) return 'Mid';
                        if (value === 5) return 'High';
                        return '';
                    }
                },
                grid: {
                    color: 'rgba(156, 163, 175, 0.1)',
                }
            }
        },
        elements: {
            line: {
                tension: 0.4 // Smooth curve
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Stress Level',
                data: stressValues,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                pointBackgroundColor: pointColors,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Line options={options} data={data} />
        </div>
    );
};

export default StressHandlingChart;
