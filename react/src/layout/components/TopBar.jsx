import { Bell, User, Menu, Sun, Moon, ScanFace } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useTheme } from '@/lib/theme/ThemeContext';

const TopBar = ({ toggleSidebar, isSidebarOpen }) => {
    const { user } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const roleLabels = { 1: 'Super Admin', 2: 'Admin', 3: 'User' };

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

            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-all"
                    title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border border-card"></span>
                </button>
 
                {user && (
                    <div className="flex items-center gap-3 pl-4 border-l border-border">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-foreground">{user.username}</p>
                            <p className="text-[10px] text-primary font-black uppercase tracking-wider">{roleLabels[user.role] || 'User'}</p>
                        </div>
                        <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground border border-border overflow-hidden">
                            <User size={16} />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default TopBar;
