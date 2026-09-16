import base64
import time
from django.contrib.auth.models import AbstractUser
from django.db import models
from config.constants.role import UserRole
from config.constants.status import Status


class User(AbstractUser):
    user_id = models.BigAutoField(primary_key=True, db_column='id')

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

    # Audit fields
    status = models.IntegerField(default=Status.Active.code)
    created_at = models.BigIntegerField(default=0, editable=False)
    created_by = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users_created'
    )
    updated_at = models.BigIntegerField(default=0)
    updated_by = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users_updated'
    )

    @property
    def id(self):
        return self.user_id

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = int(time.time())
        self.updated_at = int(time.time())
        super().save(*args, **kwargs)

    def is_super_admin(self):
        return self.role == self.SUPERADMIN or self.is_superuser

    def is_admin(self):
        return self.role in [self.ADMIN, self.SUPERADMIN] or self.is_superuser

    def is_regular_user(self):
        return self.role == self.USER

    def to_dict(self):
        """Manual serialization for User model matching CareerSync API."""
        image_data = None
        if self.image_blob:
            encoded = base64.b64encode(self.image_blob).decode('utf-8')
            image_data = f"data:image/{self.image_format or 'jpeg'};base64,{encoded}"

        full_name = f"{self.first_name} {self.last_name}".strip()
        display_name = full_name if full_name else self.username

        return {
            'user_id': self.user_id,
            'id': self.user_id,
            'username': self.username,
            'name': display_name,
            'email': self.email,
            'role': self.role,
            'status': self.status,
            'image_url': image_data,
            'created_at': self.created_at,
            'created_by': self.created_by.user_id if self.created_by else None,
            'updated_at': self.updated_at,
            'updated_by': self.updated_by.user_id if self.updated_by else None,
        }

    def __str__(self):
        return f"{self.username} ({self.role})"
