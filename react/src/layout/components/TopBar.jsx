import { useState, useRef, useEffect } from 'react';
import { Bell, User, Menu, Sun, Moon, ScanFace, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useTheme } from '@/lib/theme/ThemeContext';

const TopBar = ({ toggleSidebar, isSidebarOpen }) => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const roleLabels = { 1: 'Super Admin', 2: 'Admin', 3: 'User' };

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const menuRef = useRef(null);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10 transition-all">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 rounded-md hover:bg-secondary text-muted-foreground focus:outline-none"
                >
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-primary/10 rounded-md text-primary md:hidden">
                        <ScanFace size={20} />
                    </div>
                    <h1 className="text-lg md:text-xl font-display font-bold text-foreground hidden sm:block">
                        Attendance <span className="text-primary">System</span>
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-4" ref={menuRef}>
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-all"
                    title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="relative">
                    <button 
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            setShowProfileMenu(false);
                        }}
                        className="p-2 rounded-md hover:bg-secondary text-muted-foreground relative transition-all"
                    >
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border border-card"></span>
                    </button>
                    
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-md shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
                            <div className="px-4 py-2 border-b border-border">
                                <h3 className="font-bold text-sm">Notifications</h3>
                            </div>
                            <div className="px-4 py-3 text-xs text-muted-foreground text-center">
                                No new notifications
                            </div>
                        </div>
                    )}
                </div>
 
                {user && (
                    <div className="relative">
                        <button 
                            onClick={() => {
                                setShowProfileMenu(!showProfileMenu);
                                setShowNotifications(false);
                            }}
                            className="flex items-center gap-3 pl-4 border-l border-border hover:opacity-80 transition-opacity text-left"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-foreground">{user.username}</p>
                                <p className="text-[10px] text-primary font-black uppercase tracking-wider">{roleLabels[user.role] || 'User'}</p>
                            </div>
                            <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground border border-border overflow-hidden">
                                {user.image_url ? (
                                    <img src={user.image_url} alt={user.username} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={16} />
                                )}
                            </div>
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2">
                                <div className="px-4 py-2 border-b border-border sm:hidden">
                                    <p className="text-sm font-bold text-foreground">{user.username}</p>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-wider">{roleLabels[user.role] || 'User'}</p>
                                </div>
                                <button 
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors flex items-center gap-2"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default TopBar;
