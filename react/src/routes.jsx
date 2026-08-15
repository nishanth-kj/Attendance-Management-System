import { useRoutes, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import AdminUserDetails from '@/components/dashboard/admin/AdminUserDetails';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ROLE } from '@/constants';

export default function AppRoutes() {
  const routes = [
    // Public Routes (No Sidebar)
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },

    // Role-specific Base Application Routes
    { path: '/dashboard', element: <Dashboard /> },


    // Detail Pages (Without Sidebar context, or manually wrapped later)
    {
      path: '/users/:username',
      element: (
        <ProtectedRoute allowedRoles={[ROLE.ADMIN.code, ROLE.SUPERADMIN.code]}>
          <AdminUserDetails />
        </ProtectedRoute>
      )
    },

    // Catch all - redirect to home
    { path: '*', element: <Navigate to="/" replace /> }
  ];

  return useRoutes(routes);
}
