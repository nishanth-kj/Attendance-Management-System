import { useRoutes, Navigate } from 'react-router-dom';
import Layout from '@/layout/Layout';
import AdminLayout from '@/layout/AdminLayout';
import UserLayout from '@/layout/UserLayout';
import Home from '@/components/home/Home';
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';
import Dashboard from '@/components/dashboard/Dashboard';
import Attendance from '@/components/attendance/Attendance';
import ViewUsers from '@/components/users/ViewUsers';
import AddUser from '@/components/users/AddUser';
import AddAdmin from '@/components/users/AddAdmin';
import UserDetails from '@/components/users/UserDetails';
import AttendanceReport from '@/components/attendance/AttendanceReport';
import Profile from '@/components/users/Profile';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ROLE } from '@/constants';

export default function AppRoutes() {
  const routes = [
    // Public Routes (No Sidebar)
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },

    // Admin & SuperAdmin Routes
    {
      element: <AdminLayout />,
      children: [
        { path: '/admin-dashboard', element: <Dashboard /> },
        { path: '/users', element: <ViewUsers /> },
        // Fine-grained protection since AdminLayout allows BOTH Admin and SuperAdmin
        { path: '/users/add', element: <ProtectedRoute allowedRoles={[ROLE.ADMIN.code]}><AddUser /></ProtectedRoute> },
        { path: '/admins/add', element: <ProtectedRoute allowedRoles={[ROLE.SUPERADMIN.code]}><AddAdmin /></ProtectedRoute> },
        { path: '/users/:username', element: <UserDetails /> },
        { path: '/reports', element: <AttendanceReport /> }
      ]
    },

    // User Routes
    {
      element: <UserLayout />,
      children: [
        { path: '/user-dashboard', element: <Dashboard /> },
      ]
    },

    // General Protected Application Routes (Accessible by any authenticated role)
    {
      element: <Layout />,
      children: [
        { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
        { path: '/attendance', element: <ProtectedRoute><Attendance /></ProtectedRoute> },
        { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      ]
    },

    // Catch all - redirect to home
    { path: '*', element: <Navigate to="/" replace /> }
  ];

  return useRoutes(routes);
}
