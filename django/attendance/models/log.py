import time
from django.db import models
from django.conf import settings

from config.constants.attendance_status import AttendanceStatus


class Log(models.Model):
    log_id = models.BigAutoField(primary_key=True, db_column='id')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='attendance_logs',
        null=True,
        blank=True
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True, blank=True)
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
        return {
            'id': self.id,
            'user': self.user.id if self.user else None,
            'log_id': self.log_id,
            'id': self.log_id,
            'user': self.user.user_id if self.user else None,
            'user_id': self.user.user_id if self.user else None,
            'username': self.user.username if self.user else "Unknown",
            'user_name': display_name,
            'status': self.status,
            'created_at': self.created_at,
            'created_by': self.created_by.user_id if self.created_by else None,
            'updated_at': self.updated_at,
            'updated_by': self.updated_by.user_id if self.updated_by else None,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
        }

    def __str__(self):
        return f'{self.user.username if self.user else "Unknown"} - {self.timestamp}'
        return f'{self.user.username if self.user else "Unknown"} - {self.created_at}'
