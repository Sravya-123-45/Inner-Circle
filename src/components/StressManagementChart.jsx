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

const StressManagementChart = () => {
    const moodContext = useMood();
    const rewardsContext = useRewards();

    // Get weekly improvement data for the past 4 weeks
    const monthData = moodContext.getImprovementDataForMonth(rewardsContext);

    // Extract labels and scores
    const labels = monthData.map(week => week.weekLabel);
    const scores = monthData.map(week => week.score);

    // Create point colors based on score level
    const getPointColor = (score) => {
        if (score >= 71) return '#10b981'; // Green (Well-managed)
        if (score >= 41) return '#F59E0B'; // Yellow (Improving)
        return '#ef4444'; // Red (Struggling)
    };

    const pointColors = scores.map(score => getPointColor(score));

    // Create gradient for line
    const getLineColor = (score) => {
        if (score >= 71) return '#10b981';
        if (score >= 41) return '#F59E0B';
        return '#ef4444';
    };

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
                        const score = context.parsed.y;
                        let level = 'Building habits';

                        if (score >= 71) level = 'Well-managed! 🌟';
                        else if (score >= 41) level = 'Improving steadily 🌱';
                        else level = 'Building healthy habits';

                        return level;
                    },
                    title: function (context) {
                        return context[0].label;
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
                        size: 11,
                        weight: 500
                    }
                }
            },
            y: {
                min: 0,
                max: 100,
                ticks: {
                    color: '#9CA3AF',
                    font: {
                        size: 10
                    },
                    callback: function (value) {
                        // Show supportive labels instead of numbers
                        if (value === 20) return 'Struggling';
                        if (value === 55) return 'Improving';
                        if (value === 85) return 'Well-managed';
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
                tension: 0.4 // Smooth curve for encouraging feel
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Stress Management',
                data: scores,
                borderColor: '#6366f1', // Consistent encouraging purple
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                fill: true,
                pointBackgroundColor: pointColors,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 3,
            },
        ],
    };

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Line options={options} data={data} />
        </div>
    );
};

export default StressManagementChart;
