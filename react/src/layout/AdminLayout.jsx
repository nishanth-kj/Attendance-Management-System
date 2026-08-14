import { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useAuth } from '@/lib/auth/AuthContext';
import { ROLE } from '@/constants';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const { user, loading } = useAuth();
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-md h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Role check for Admin/Superadmin
    if (user.role !== ROLE.ADMIN.code && user.role !== ROLE.SUPERADMIN.code) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden transition-all">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300`}>
                <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
