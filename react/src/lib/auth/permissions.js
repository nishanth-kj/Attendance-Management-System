/**
 * Role Constants
 */
export const ROLES = {
    SUPERADMIN: 1,
    ADMIN: 2,
    USER: 3
};

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
export const isSuperAdmin = (user) => hasRole(user, ROLES.SUPERADMIN);
export const isAdmin = (user) => hasRole(user, ROLES.ADMIN);
export const isUser = (user) => user?.role === ROLES.USER;

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
