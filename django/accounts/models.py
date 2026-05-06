from django.contrib.auth.models import AbstractUser
from django.db import models
from config.constants.role import UserRole

class User(AbstractUser):
    SUPERADMIN = UserRole.SUPERADMIN.code
    ADMIN = UserRole.ADMIN.code
    USER = UserRole.USER.code
    
    ROLE_CHOICES = UserRole.choices()
    
    role = models.IntegerField(
        choices=ROLE_CHOICES,
        default=USER
    )
    
    # Biometric fields for Staff & Students
    image_blob = models.BinaryField(null=True, blank=True)
    image_format = models.CharField(max_length=10, null=True, blank=True)
    face_embedding = models.BinaryField(null=True, blank=True)
    
    # Academic Info
    # (Removed department and academic structure as per request)
    
    def is_super_admin(self):
        return self.role == self.SUPERADMIN or self.is_superuser

    def is_admin(self):
        return self.role in [self.ADMIN, self.SUPERADMIN] or self.is_superuser

    def is_regular_user(self):
        return self.role == self.USER

    def __str__(self):
        return f"{self.username} ({self.role})"
