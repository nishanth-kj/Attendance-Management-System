import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { LayoutDashboard, Camera, User } from 'lucide-react';

import Dashboard from '@/pages/Dashboard';
import Attendance from '@/components/shared/Attendance';
import Profile from '@/components/shared/Profile';

const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeView, setActiveView] = useState('dashboard');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const genericLinks = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: Dashboard },
        { id: 'attendance', label: 'Attendance', icon: Camera, component: Attendance },
        { id: 'profile', label: 'My Profile', icon: User, component: Profile },
    ];

    const ActiveComponent = genericLinks.find(link => link.id === activeView)?.component || Dashboard;

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-background text-foreground overflow-hidden transition-all">
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    links={genericLinks}
                    activeId={activeView}
                    onNavigate={setActiveView}
                />

                {/* Main Content Wrapper */}
                <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300`}>
                    <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                    {/* Main Content Area */}
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
                        <ActiveComponent onNavigate={setActiveView} />
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Layout;
