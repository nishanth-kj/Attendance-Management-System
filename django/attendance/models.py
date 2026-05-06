from django.db import models
from django.conf import settings


from config.constants.attendance_status import AttendanceStatus

class Log(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='attendance_logs', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=AttendanceStatus.choices(), default=AttendanceStatus.PRESENT)

    def __str__(self):
        return f'{self.user.username if self.user else "Unknown"} - {self.timestamp}'

