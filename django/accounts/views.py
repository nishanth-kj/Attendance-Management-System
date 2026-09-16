from rest_framework import views
from rest_framework.permissions import AllowAny, IsAuthenticated

from accounts.permissions import IsAdmin
from config.constants.error_code import ErrorCode
from config.constants.error_message import ErrorMessage
from config.constants.role import UserRole
from config.exceptions.api_exception import APIException
from config.utils.responses import APIResponse
from config.utils.validation import Validator
from .services import UserService, AuthService


class RegisterView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        v = Validator(request.data)
        result = UserService.create_user(
            username=v.required('username'),
            password=v.required('password', min_length=6),
            email=v.optional('email', default=''),
            role=v.integer('role', default=UserRole.USER.code),
            image_input=v.optional('image_input'),
        )
        return APIResponse(result).success()


class DemoView(views.APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        data = {
            "roles": [
                {
                    "title": "Administrator",
                    "description": "Full access to manage users and system settings.",
                    "username": "admin",
                    "password": "admin123",
                    "capabilities": ["All system features", "User Management", "System Logs"]
                },
                {
                    "title": "Regular User",
                    "description": "Access to personal attendance records and check-in history.",
                    "username": "user_1",
                    "password": "password123",
                    "capabilities": ["Personal Dashboard", "Attendance History", "Biometric Check-in Status"]
                }
            ],
            "note": "Use these credentials to explore the system functionality."
        }
        return APIResponse(data).success()


class LoginView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        v = Validator(request.data)
        result = AuthService.login_user(
            request,
            v.required('username'),
            v.required('password')
        )
        return APIResponse(result).success()


class UserInfoView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_data = request.user.to_dict()
        return APIResponse(user_data).success()


class UserDetailView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        is_admin = request.user.is_admin() if callable(request.user.is_admin) else bool(request.user.is_admin)
        if not (is_admin or request.user.id == pk):
            raise APIException(ErrorCode.UNAUTHORIZED, ErrorMessage.UNAUTHORIZED)

        user_data = UserService.get_user_detail(pk)
        return APIResponse(user_data).success()

    def delete(self, request, pk):
        is_admin = request.user.is_admin() if callable(request.user.is_admin) else bool(request.user.is_admin)
        if not is_admin:
            raise APIException(ErrorCode.UNAUTHORIZED, "Only admins can delete users")

        UserService.delete_user(pk)
        return APIResponse(None).success()
