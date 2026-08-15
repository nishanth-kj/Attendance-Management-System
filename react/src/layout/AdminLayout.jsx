import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ROLE } from '@/constants';
import { LayoutDashboard, Camera, Users, UserPlus, FileText, User } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import api from '@/lib/api';

import AdminHome from '@/components/dashboard/admin/AdminHome';
import AdminAttendance from '@/components/dashboard/admin/AdminAttendance';
import AdminViewUsers from '@/components/dashboard/admin/AdminViewUsers';
import AdminAddUser from '@/components/dashboard/admin/AdminAddUser';
import AdminAttendanceReport from '@/components/dashboard/admin/AdminAttendanceReport';
import AdminProfile from '@/components/dashboard/admin/AdminProfile';

const AdminLayout = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeView, setActiveView] = useState('dashboard');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const adminLinks = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: AdminHome },
        { id: 'attendance', label: 'Attendance', icon: Camera, component: AdminAttendance },
        { id: 'users', label: 'Users', icon: Users, component: AdminViewUsers },
        { id: 'add-user', label: 'Add User', icon: UserPlus, component: AdminAddUser },
        { id: 'reports', label: 'Reports', icon: FileText, component: AdminAttendanceReport },
        { id: 'profile', label: 'My Profile', icon: User, component: AdminProfile },
    ];

    const ActiveComponent = adminLinks.find(link => link.id === activeView)?.component || AdminHome;

    return (
        <ProtectedRoute allowedRoles={[ROLE.ADMIN.code, ROLE.SUPERADMIN.code]}>
            <div className="flex h-screen bg-background text-foreground overflow-hidden transition-all">
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    links={adminLinks}
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

export default AdminLayout;
