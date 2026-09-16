"""Custom permissions for role-based access control matching CareerSync."""

from rest_framework import permissions


class IsSuperAdmin(permissions.BasePermission):
    """Permission class for super-admin only access."""

    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return request.user.is_super_admin() if callable(request.user.is_super_admin) else bool(request.user.is_super_admin)


class IsAdmin(permissions.BasePermission):
    """Permission class for admin or super-admin access."""

    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return request.user.is_admin() if callable(request.user.is_admin) else bool(request.user.is_admin)


class IsRegularUser(permissions.BasePermission):
    """Permission class for regular student/user access."""

    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return request.user.is_regular_user() if callable(request.user.is_regular_user) else bool(request.user.is_regular_user)


class IsOwnerOrAdmin(permissions.BasePermission):
    """Permission class to allow resource owner or admin access."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.user.is_admin() if callable(request.user.is_admin) else bool(request.user.is_admin):
            return True
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return obj == request.user
