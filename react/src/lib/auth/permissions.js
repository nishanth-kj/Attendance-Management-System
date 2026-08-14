import { ROLE } from '@/constants';

/**
 * Check if user has a specific role or higher
 * @param {Object} user 
 * @param {number} requiredRole 
 * @returns {boolean}
 */
export const hasRole = (user, requiredRole) => {
    if (!user || !user.role) return false;
    // Lower number means higher privilege (1=SuperAdmin, 2=Admin, 3=User)
    return user.role <= requiredRole;
};

/**
 * Permission check helpers
 */
export const isSuperAdmin = (user) => hasRole(user, ROLE.SUPERADMIN.code);
export const isAdmin = (user) => hasRole(user, ROLE.ADMIN.code);
export const isUser = (user) => user?.role === ROLE.USER.code;


/**
 * Specific action permissions
 */
export const canManageUsers = (user) => isAdmin(user);
export const canViewReports = (user) => isAdmin(user);
export const canMarkAttendance = (user) => !!user;
export const canEditSystemSettings = (user) => isSuperAdmin(user);

/**
 * Hook-like helper for components
 * Usage: const { canManage } = usePermissions(user);
 */
export const getPermissions = (user) => ({
    isSuperAdmin: isSuperAdmin(user),
    isAdmin: isAdmin(user),
    isUser: isUser(user),
    canManageUsers: canManageUsers(user),
    canViewReports: canViewReports(user),
    canMarkAttendance: canMarkAttendance(user),
    canEditSystemSettings: canEditSystemSettings(user),
});
