import csv
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework import views
from rest_framework.permissions import AllowAny, IsAuthenticated

from accounts.permissions import IsAdmin
from accounts.services import UserService
from config.constants.error_code import ErrorCode
from config.constants.error_message import ErrorMessage
from config.constants.role import UserRole
from config.exceptions.api_exception import APIException
from config.utils.responses import APIResponse
from config.utils.validation import Validator
from .services import AttendanceService

User = get_user_model()


class UserListView(views.APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        v = Validator(request.query_params)
        role_param = v.integer("role", default=UserRole.USER.code)

        # Security: Only SuperAdmin can view other Admins/SuperAdmins
        is_super = request.user.is_super_admin() if callable(request.user.is_super_admin) else bool(request.user.is_super_admin)
        if not is_super and role_param != UserRole.USER.code:
            raise APIException(ErrorCode.UNAUTHORIZED, "Access denied")

        result = UserService.get_user_list(role=role_param)
        return APIResponse(result).success()

    def post(self, request):
        v = Validator(request.data)
        requested_role = v.integer("role", default=UserRole.USER.code)

        is_super = request.user.is_super_admin() if callable(request.user.is_super_admin) else bool(request.user.is_super_admin)
        # Security: Admin can only create regular User. SuperAdmin can create Admin or User.
        if not is_super and requested_role != UserRole.USER.code:
            raise APIException(ErrorCode.UNAUTHORIZED, "Admins can only register regular users")

        if is_super and requested_role not in [UserRole.ADMIN.code, UserRole.USER.code]:
            raise APIException(ErrorCode.VALIDATION_ERROR, "Invalid role requested")

        result = UserService.create_user(
            username=v.required('username'),
            password=v.required('password', min_length=6),
            email=v.optional('email', default=''),
            role=requested_role,
            image_input=v.optional('image_input')
        )
        return APIResponse(result).success()


class UserDetailView(views.APIView):
    permission_classes = [IsAdmin]

    def get(self, request, username):
        result = UserService.get_user_by_username(username)
        return APIResponse(result).success()

    def delete(self, request, username):
        user = User.objects.filter(username=username).first()
        if not user:
            raise APIException(ErrorCode.USER_NOT_FOUND, ErrorMessage.USER_NOT_FOUND)

        is_super = request.user.is_super_admin() if callable(request.user.is_super_admin) else bool(request.user.is_super_admin)
        if not is_super and user.role != UserRole.USER.code:
            raise APIException(ErrorCode.UNAUTHORIZED, "Unauthorized to delete this user")

        user.delete()
        return APIResponse(None).success()


class AttendanceMarkView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        v = Validator(request.data)
        image_data = v.required('image')
        result = AttendanceService.mark_attendance(image_data)
        return APIResponse(result).success()


class AttendanceLogView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        is_regular = request.user.is_regular_user() if callable(request.user.is_regular_user) else bool(request.user.is_regular_user)
        if is_regular:
            logs = AttendanceService.get_logs(username=request.user.username)
        else:
            username = request.query_params.get('username')
            logs = AttendanceService.get_logs(username=username)

        if request.query_params.get('format') == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="attendance_report.csv"'

            writer = csv.writer(response)
            writer.writerow(['Username', 'Timestamp'])
            for log in logs:
                writer.writerow([log.get('username'), log.get('timestamp')])
            return response

        return APIResponse(logs).success()


class AttendanceAnalyticsView(views.APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        result = AttendanceService.get_analytics()
        return APIResponse(result).success()
