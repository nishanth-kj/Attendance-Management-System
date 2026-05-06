import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import api from '@/lib/api';

// Dashboards
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import UserDashboard from './dashboards/UserDashboard';

const Dashboard = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [logs, setLogs] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const isADMIN = [1, 2].includes(user.role);
                const logsData = await api.get('/attendance/logs/');
                setLogs(logsData || []);

                if (isADMIN) {
                    const analyticsData = await api.get('/attendance/analytics/');
                    setAnalytics(analyticsData);
                }
            } catch (err) {
                console.error("Dashboard Sync Failed", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handleExport = () => {
        window.open(`${import.meta.env.VITE_API_URL}attendance/logs/?format=csv`, '_blank');
    };

    if (isLoading) return (
        <div className="flex h-64 items-center justify-center">
            <div className="text-xl text-gray-500 font-medium animate-pulse">Loading Dashboard...</div>
        </div>
    );

    if (user?.role === 1) {
        return (
            <SuperAdminDashboard
                user={user}
                analytics={analytics}
                logs={logs}
                handleExport={handleExport}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        );
    }

    if (user?.role === 2) {
        return (
            <AdminDashboard
                user={user}
                analytics={analytics}
                logs={logs}
                handleExport={handleExport}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        );
    }

    if (user?.role === 3) {
        return (
            <UserDashboard
                user={user}
                logs={logs}
            />
        );
    }

    return <div className="p-8 text-center text-gray-500">Unknown Role</div>;
};

export default Dashboard;
