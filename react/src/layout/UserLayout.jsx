import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ROLE } from '@/constants';
import { LayoutDashboard, Camera, User } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import api from '@/lib/api';

import UserHome from '@/components/dashboard/user/UserHome';
import UserAttendance from '@/components/dashboard/user/UserAttendance';
import UserProfile from '@/components/dashboard/user/UserProfile';

const UserLayout = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeView, setActiveView] = useState('dashboard');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const userLinks = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: UserHome },
        { id: 'attendance', label: 'Attendance', icon: Camera, component: UserAttendance },
        { id: 'profile', label: 'My Profile', icon: User, component: UserProfile },
    ];

    const ActiveComponent = userLinks.find(link => link.id === activeView)?.component || UserHome;

    return (
        <ProtectedRoute allowedRoles={[ROLE.USER.code]}>
            <div className="flex h-screen bg-background text-foreground overflow-hidden transition-all">
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    links={userLinks}
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

export default UserLayout;
