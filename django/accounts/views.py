from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView

from attendance.permissions import IsAdmin
from config.utils import APIResponse
from config.constants.api_status import APIStatus
from .services import UserService, AuthService


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        result = UserService.create_user(
            username=request.data.get('username'),
            password=request.data.get('password'),
            email=request.data.get('email', ''),
            role=request.data.get('role', 3),
        )
        if result.is_success:
            return APIResponse(APIStatus.SUCCESS, data=result.data, status_code=status.HTTP_201_CREATED)
        return APIResponse(APIStatus.ERROR, error=result.error, status_code=result.status_code)

class DemoView(APIView):
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
        return APIResponse(APIStatus.SUCCESS, data=data)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        result = AuthService.login_user(username, password)
        if result.is_success:
            return APIResponse(APIStatus.SUCCESS, data=result.data)
        return APIResponse(APIStatus.ERROR, error=result.error, status_code=result.status_code)

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_data = UserService.user_to_dict(request.user)
        return APIResponse(APIStatus.SUCCESS, data=user_data)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        result = UserService.get_user_detail(pk)
        if not result.is_success:
            return APIResponse(APIStatus.ERROR, error=result.error, status_code=result.status_code)
        
        user_data = result.data
        if request.user.role in [1, 2] or request.user.id == user_data['id']:
            return APIResponse(APIStatus.SUCCESS, data=user_data)
        return APIResponse(APIStatus.ERROR, error="Unauthorized", status_code=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        if request.user.role not in [1, 2]:
            return APIResponse(APIStatus.ERROR, error="Only admins can delete users", status_code=status.HTTP_403_FORBIDDEN)
        result = UserService.delete_user(pk)
        if result.is_success:
             return APIResponse(APIStatus.SUCCESS, data=None, status_code=status.HTTP_204_NO_CONTENT)
        return APIResponse(APIStatus.ERROR, error=result.error, status_code=result.status_code)
