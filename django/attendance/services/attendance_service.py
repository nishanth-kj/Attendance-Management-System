from django.contrib.auth import get_user_model
from django.db.models import Count
from django.db.models.functions import TruncDate
from django.utils import timezone

from attendance.models import Log
from attendance.services.biometric_service import BiometricService
from config.constants.attendance_status import AttendanceStatus
from config.constants.error_code import ErrorCode
from config.constants.error_message import ErrorMessage
from config.constants.role import UserRole
from config.exceptions.api_exception import APIException
from config.logger import logger

User = get_user_model()


class AttendanceService:
    """Attendance business logic service matching CareerSync API pattern."""

    @staticmethod
    def log_to_dict(log):
        """Manual serialization for Log model."""
        if hasattr(log, 'to_dict'):
            return log.to_dict()

        full_name = f"{log.user.first_name} {log.user.last_name}".strip() if log.user else ""
        display_name = full_name if full_name else (log.user.username if log.user else "Unknown")

        return {
            'id': log.id,
            'user': log.user.id if log.user else None,
            'username': log.user.username if log.user else "Unknown",
            'user_name': display_name,
            'status': log.status,
            'timestamp': log.timestamp.isoformat() if log.timestamp else None,
        }

    @classmethod
    def mark_attendance(cls, image_data):
        if not image_data:
            raise APIException(ErrorCode.VALIDATION_ERROR, "No image data provided", field="image")

        logger.info("Extracting face encoding for biometric attendance...")
        # 1. Extract Encoding using BiometricService
        encoding = BiometricService.extract_encoding(image_data)
        if encoding is None:
            logger.warning("Biometric attendance failed: No face detected.")
            raise APIException(ErrorCode.FACE_NOT_DETECTED, ErrorMessage.FACE_NOT_DETECTED, field="image")

        # 2. Identify User using BiometricService
        users = User.objects.filter(role=UserRole.USER.code).exclude(face_embedding__isnull=True)
        user = BiometricService.identify_user(encoding, users)

        if not user:
            logger.warning("Biometric attendance failed: No match found.")
            raise APIException(ErrorCode.NOT_FOUND, "No matching student found for biometric image")

        log = Log.objects.create(user=user, status=AttendanceStatus.PRESENT.code)
        logger.info(f"Attendance marked for user: {user.username} (log id: {log.id})")

        return {
            'username': user.username,
            'role': user.role,
            'name': f"{user.first_name} {user.last_name}".strip() or user.username,
            'log': cls.log_to_dict(log)
        }

    @classmethod
    def get_logs(cls, username=None):
        if username:
            logs = Log.objects.filter(user__username=username).order_by('-timestamp')
        else:
            logs = Log.objects.all().order_by('-timestamp')

        return [cls.log_to_dict(l) for l in logs]

    @classmethod
    def get_analytics(cls):
        today = timezone.now().date()
        total_users = User.objects.filter(role=UserRole.USER.code).count()
        today_attendance = Log.objects.filter(timestamp__date=today).values('user').distinct().count()

        # Monthly trend (last 30 days)
        last_30_days = timezone.now() - timezone.timedelta(days=30)
        daily_stats = Log.objects.filter(timestamp__gte=last_30_days) \
            .annotate(date=TruncDate('timestamp')) \
            .values('date') \
            .annotate(count=Count('user', distinct=True)) \
            .order_by('date')

        return {
            'summary': {
                'total_users': total_users,
                'today_present': today_attendance,
                'attendance_rate': (today_attendance / total_users * 100) if total_users > 0 else 0
            },
            'trends': list(daily_stats)
        }
