import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import {
    Camera,
    LayoutDashboard,
    Users,
    FileText,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ScanFace,
    UserPlus,
    ShieldPlus
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['AUTHENTICATED'] },
        { path: '/attendance', label: 'Attendance', icon: Camera, roles: ['ANY'] },
        { path: '/users', label: 'Users', icon: Users, roles: [1, 2] },
        { path: '/users/add', label: 'Add User', icon: UserPlus, roles: [2] },
        { path: '/admins/add', label: 'Add Admin', icon: ShieldPlus, roles: [1] },
        { path: '/reports', label: 'Reports', icon: FileText, roles: [1, 2] },
        { path: '/profile', label: 'My Profile', icon: User, roles: ['AUTHENTICATED'] },
    ];

    const filteredLinks = navLinks.filter(link => {
        if (link.roles.includes('ANY')) return true;
        if (!user) return false;
        if (link.roles.includes('AUTHENTICATED')) return true;
        return link.roles.includes(user.role);
    });

    return (
        <>
            {/* Desktop Sidebar (Static / Collapsible) */}
            <aside className={`
                hidden md:flex h-screen
                bg-card border-r border-border
                transition-all duration-300 ease-in-out
                ${isOpen ? 'w-64' : 'w-20'}
                flex-col relative z-30
            `}>
                <div className={`h-16 flex items-center ${isOpen ? 'justify-start px-6' : 'justify-center'} border-b border-border relative`}>
                    {isOpen ? (
                        <div className="flex items-center gap-3">
                            <div className="p-1 bg-primary/10 rounded-md text-primary">
                                <ScanFace size={20} />
                            </div>
                            <span className="font-bold text-lg text-foreground truncate font-display">Attendance System</span>
                        </div>
                    ) : (
                        <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                            <ScanFace size={20} />
                        </div>
                    )}

                    <button
                        onClick={toggleSidebar}
                        className="absolute -bottom-3 -right-3 bg-card border border-border rounded-md p-1 text-muted-foreground hover:text-primary hover:border-primary shadow-sm z-50 transition-all flex items-center justify-center cursor-pointer"
                        style={{ width: '24px', height: '24px' }}
                    >
                        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-1">
                    {filteredLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => `
                                flex items-center px-4 py-3 mx-2 rounded-lg text-sm font-medium transition-all
                                ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}
                                ${!isOpen && 'justify-center px-2'}
                            `}
                            title={!isOpen ? link.label : ''}
                        >
                            <link.icon size={20} className="shrink-0" />
                            {isOpen && <span className="ml-3 truncate">{link.label}</span>}
                        </NavLink>
                    ))}
                </div>

                <div className="border-t border-border p-4 bg-card">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className={`w-full flex items-center ${isOpen ? 'justify-start px-4' : 'justify-center'} py-2 text-destructive rounded hover:bg-destructive/10 transition-colors`}
                            title="Logout"
                        >
                            <LogOut size={20} className="shrink-0" />
                            {isOpen && <span className="ml-3 text-sm font-medium">Logout</span>}
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className={`block w-full text-center py-2 bg-primary text-primary-foreground rounded hover:opacity-90 text-sm font-medium`}
                        >
                            {isOpen ? 'Login' : 'Log'}
                        </NavLink>
                    )}
                </div>

                {/* Toggle Button Removed from here - moved to TopBar */}
            </aside>


            {/* Mobile Sidebar (Drawer) */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-40 flex">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={toggleSidebar}></div>

                    {/* Drawer Content */}
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-card transition-all transform duration-300 shadow-2xl border-r border-border">
                        {/* Wrapper for content */}

                        <div className="h-16 flex items-center px-4 border-b border-border gap-3 relative bg-card">
                            <div className="p-1 bg-primary/10 rounded-md text-primary">
                                <ScanFace size={24} />
                            </div>
                            <span className="font-bold text-lg text-foreground font-display">Attendance System</span>

                            {/* Toggle Button for Mobile Drawer */}
                            <button
                                onClick={toggleSidebar}
                                className="absolute -bottom-3 -right-3 bg-card border border-border rounded-md p-1 text-muted-foreground hover:text-primary shadow-sm z-50 transition-all flex items-center justify-center cursor-pointer"
                                style={{ width: '24px', height: '24px' }}
                            >
                                <ChevronLeft size={14} />
                            </button>
                        </div>

                        <div className="flex-1 h-0 overflow-y-auto py-4">
                            <nav className="space-y-1 px-2">
                                {filteredLinks.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={toggleSidebar}
                                        className={({ isActive }) => `
                                            flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all
                                            ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}
                                        `}
                                    >
                                        <link.icon size={24} className="mr-4" />
                                        {link.label}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
 
                        <div className="border-t border-border p-4">
                            {user && (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-3 text-base font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                >
                                    <LogOut size={24} className="mr-4" />
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="shrink-0 w-14">
                        {/* Force sidebar to shrink to fit close icon */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
