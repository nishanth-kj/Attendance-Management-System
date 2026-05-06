import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Attendance from '@/pages/Attendance';
import ViewUsers from '@/pages/ViewUsers';
import AddUser from '@/pages/AddUser';
import AddAdmin from '@/pages/AddAdmin';
import UserDetails from '@/pages/UserDetails';
import AttendanceReport from '@/pages/AttendanceReport';
import Profile from '@/pages/Profile';
import ProtectedRoute from '@/components/ProtectedRoute';

import AdminLogin from '@/pages/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (No Sidebar) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Application Routes (With Sidebar Layout) */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={[3]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin & ADMIN Only Routes */}
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <ViewUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/add"
            element={
              <ProtectedRoute allowedRoles={[2]}>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admins/add"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <AddAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:username"
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <AttendanceReport />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
