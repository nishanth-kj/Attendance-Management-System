from .base_enum import BaseEnum


class UserRole(BaseEnum):
    SUPERADMIN = (1, "Super Admin")
    ADMIN = (2, "Admin")
    USER = (3, "User")
