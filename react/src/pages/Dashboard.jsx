import { useAuth } from '@/lib/auth/AuthContext';
import { Navigate } from 'react-router-dom';
import SuperAdminLayout from '@/layout/SuperAdminLayout';
import AdminLayout from '@/layout/AdminLayout';
import UserLayout from '@/layout/UserLayout';
import { ROLE } from '@/constants';

const Dashboard = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background text-foreground">
                <div className="text-xl font-medium animate-pulse">Authenticating...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === ROLE.SUPERADMIN.code) {
        return <SuperAdminLayout />;
    }

    if (user.role === ROLE.ADMIN.code) {
        return <AdminLayout />;
    }

    if (user.role === ROLE.USER.code) {
        return <UserLayout />;
    }

    return <div className="flex h-screen items-center justify-center bg-background text-foreground">Unauthorized Role</div>;
};

export default Dashboard;
