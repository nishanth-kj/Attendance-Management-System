import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ROLE } from '@/constants';
import { LayoutDashboard, Camera, Users, ShieldPlus, FileText, User } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import api from '@/lib/api';

import SuperAdminHome from '@/components/dashboard/super-admin/SuperAdminHome';
import SuperAdminAttendance from '@/components/dashboard/super-admin/SuperAdminAttendance';
import SuperAdminViewUsers from '@/components/dashboard/super-admin/SuperAdminViewUsers';
import SuperAdminAddAdmin from '@/components/dashboard/super-admin/SuperAdminAddAdmin';
import SuperAdminAttendanceReport from '@/components/dashboard/super-admin/SuperAdminAttendanceReport';
import SuperAdminProfile from '@/components/dashboard/super-admin/SuperAdminProfile';

const SuperAdminLayout = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeView, setActiveView] = useState('dashboard');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const superAdminLinks = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: SuperAdminHome },
        { id: 'attendance', label: 'Attendance', icon: Camera, component: SuperAdminAttendance },
        { id: 'users', label: 'Users', icon: Users, component: SuperAdminViewUsers },
        { id: 'add-admin', label: 'Add Admin', icon: ShieldPlus, component: SuperAdminAddAdmin },
        { id: 'reports', label: 'Reports', icon: FileText, component: SuperAdminAttendanceReport },
        { id: 'profile', label: 'My Profile', icon: User, component: SuperAdminProfile },
    ];

    const ActiveComponent = superAdminLinks.find(link => link.id === activeView)?.component || SuperAdminHome;

    return (
        <ProtectedRoute allowedRoles={[ROLE.SUPERADMIN.code]}>
            <div className="flex h-screen bg-background text-foreground overflow-hidden transition-all">
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    links={superAdminLinks}
                    activeId={activeView}
                    onNavigate={setActiveView}
                />
                <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300`}>
                    <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                        <ActiveComponent onNavigate={setActiveView} />
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default SuperAdminLayout;
