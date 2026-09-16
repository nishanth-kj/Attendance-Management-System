"""Permissions for attendance app matching CareerSync API pattern."""

from rest_framework import permissions
from accounts.permissions import IsSuperAdmin, IsAdmin, IsRegularUser, IsOwnerOrAdmin


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return obj == request.user


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_admin() if callable(request.user.is_admin) else bool(request.user.is_admin)


__all__ = [
    'IsSuperAdmin',
    'IsAdmin',
    'IsRegularUser',
    'IsOwnerOrAdmin',
    'IsOwner',
    'IsAdminOrReadOnly',
]
