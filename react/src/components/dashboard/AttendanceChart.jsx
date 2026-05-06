import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@/lib/theme/ThemeContext';

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

const AttendanceChart = ({ data }) => {
    const { isDarkMode } = useTheme();

    if (!data || data.length === 0) {
        return (
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border h-80 flex items-center justify-center text-muted-foreground transition-all">
                No chart data available
            </div>
        );
    }

    const primaryColor = '#3b82f6'; // Blue-500
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDarkMode ? '#94a3b8' : '#64748b'; // slate-400 / slate-500

    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Users Present',
                data: data.map(item => item.count),
                borderColor: primaryColor,
                backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                pointBackgroundColor: primaryColor,
                pointBorderColor: isDarkMode ? '#1e293b' : '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                titleColor: isDarkMode ? '#f8fafc' : '#1e293b',
                bodyColor: isDarkMode ? '#f8fafc' : '#1e293b',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                cornerRadius: 8,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    borderDash: [4, 4],
                    color: gridColor,
                    drawBorder: false,
                },
                ticks: {
                    stepSize: 1,
                    color: textColor,
                    font: {
                        size: 11,
                        weight: '600'
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: textColor,
                    font: {
                        size: 11,
                        weight: '600'
                    }
                }
            }
        }
    };

    return (
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all">
            <h3 className="text-xl font-display font-bold text-foreground mb-6 border-b border-border pb-3">
                Attendance Trends
            </h3>
            <div className="h-72">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default AttendanceChart;
