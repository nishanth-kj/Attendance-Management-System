import time
from django.db import models
from django.conf import settings

from config.constants.attendance_status import AttendanceStatus


class Log(models.Model):
    log_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='attendance_logs',
        null=True,
        blank=True
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(
        choices=AttendanceStatus.choices(),
        default=AttendanceStatus.PRESENT.code
    )

    # Audit fields
    created_at = models.BigIntegerField(default=0, editable=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='attendance_logs_created'
    )
    updated_at = models.BigIntegerField(default=0)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='attendance_logs_updated'
    )

    @property
    def id(self):
        return self.log_id

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = int(time.time())
        self.updated_at = int(time.time())
        super().save(*args, **kwargs)

    def to_dict(self):
        full_name = f"{self.user.first_name} {self.user.last_name}".strip() if self.user else ""
        display_name = full_name if full_name else (self.user.username if self.user else "Unknown")
        user_pk = getattr(self.user, 'user_id', getattr(self.user, 'id', None)) if self.user else None
        created_by_pk = getattr(self.created_by, 'user_id', getattr(self.created_by, 'id', None)) if self.created_by else None
        updated_by_pk = getattr(self.updated_by, 'user_id', getattr(self.updated_by, 'id', None)) if self.updated_by else None

        return {
            'log_id': self.log_id,
            'id': self.log_id,
            'user': user_pk,
            'user_id': user_pk,
            'username': self.user.username if self.user else "Unknown",
            'user_name': display_name,
            'status': self.status,
            'created_at': self.created_at,
            'created_by': created_by_pk,
            'updated_at': self.updated_at,
            'updated_by': updated_by_pk,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
        }

    def __str__(self):
        return f'{self.user.username if self.user else "Unknown"} - {self.timestamp}'
