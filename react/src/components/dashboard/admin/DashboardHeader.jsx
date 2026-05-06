import { LogOut, UserPlus, FileDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePermissions } from '@/lib/auth/AuthContext';

const DashboardHeader = ({ user, onExport }) => {
    const { isAdmin, canManageUsers } = usePermissions();
    const roleLabels = { 1: 'Super Admin', 2: 'Admin', 3: 'User' };

    return (
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all">
            <div>
                <h2 className="text-2xl font-display font-light text-foreground leading-tight">Dashboard</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <User size={16} />
                    <span>Welcome, <span className="font-semibold text-foreground">{user?.username}</span></span>
                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                        {roleLabels[user?.role] || 'User'}
                    </span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto items-center">
                {isAdmin && (
                    <>
                        <button
                            onClick={onExport}
                            className="flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground bg-card hover:bg-secondary rounded-md text-sm font-medium transition-all"
                        >
                            <FileDown size={16} />
                            Export Data
                        </button>
                        <Link
                            to="/users/add"
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 rounded-md text-sm font-medium text-center transition-all shadow-lg shadow-primary/20"
                        >
                            <UserPlus size={16} />
                            Enrol User
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default DashboardHeader;
