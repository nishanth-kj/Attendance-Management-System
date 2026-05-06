from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView

from accounts.services import UserService
from config.utils import APIResponse
from config.constants.api_status import APIStatus
from .permissions import IsAdmin, IsSuperAdmin
from .services import AttendanceService


class UserListView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        role_param = request.query_params.get('role', 'USER')
        
        # Security: Only SuperAdmin can see other Admins/SuperAdmins
        if request.user.role == 2 and role_param != 'USER':
            return APIResponse(APIStatus.ERROR, error="Access denied", status_code=status.HTTP_403_FORBIDDEN)
            
        result = UserService.get_user_list(role=role_param)
        return APIResponse(APIStatus.SUCCESS, data=result.data)

    def post(self, request):
        requested_role = int(request.data.get('role', 3))
        
        # Security: Admin (2) can only create User (3). SuperAdmin (1) can create Admin (2) or User (3).
        if request.user.role == 2 and requested_role != 3:
            return APIResponse(APIStatus.ERROR, error="Admins can only register regular users", status_code=status.HTTP_403_FORBIDDEN)
        
        if request.user.role == 1 and requested_role not in [2, 3]:
             return APIResponse(APIStatus.ERROR, error="Invalid role requested", status_code=status.HTTP_400_BAD_REQUEST)

        result = UserService.create_user(
            username=request.data.get('username'),
            password=request.data.get('password'),
            email=request.data.get('email', ''),
            role=requested_role,
            image_input=request.data.get('image_input')
        )
        if result.is_success:
            return APIResponse(APIStatus.SUCCESS, data=result.data, status_code=status.HTTP_201_CREATED)
        return APIResponse(APIStatus.ERROR, error=result.error, status_code=result.status_code)

class UserDetailView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request, username):
        result = UserService.get_user_by_username(username)
        if result.is_success:
            return APIResponse(APIStatus.SUCCESS, data=result.data)
        return APIResponse(APIStatus.ERROR, error=result.error, status_code=result.status_code)

    def delete(self, request, username):
        try:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            user = User.objects.get(username=username)
            
            # Authorization check
            if request.user.role == 1:
                pass # Superadmin can delete anyone
            elif request.user.role == 2 and user.role == 3:
                pass # Admin can only delete regular users
            else:
                return APIResponse(APIStatus.ERROR, error="Unauthorized to delete this user", status_code=status.HTTP_403_FORBIDDEN)
                
            user.delete()
            return APIResponse(APIStatus.SUCCESS, data=None, status_code=status.HTTP_204_NO_CONTENT)
        except Exception:
            return APIResponse(APIStatus.ERROR, error="User not found", status_code=status.HTTP_404_NOT_FOUND)

class AttendanceMarkView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        image_data = request.data.get('image')
        result = AttendanceService.mark_attendance(image_data)
        
        if result.is_success:
            return APIResponse(APIStatus.SUCCESS, data=result.data)
        return APIResponse(APIStatus.ERROR, error=result.error, status_code=result.status_code)

class AttendanceLogView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role == 3:
            result = AttendanceService.get_logs(username=request.user.username)
        else:
            username = request.query_params.get('username')
            result = AttendanceService.get_logs(username)
        
        if not result.is_success:
            return APIResponse(APIStatus.ERROR, error=result.error, status_code=result.status_code)
            
        logs = result.data
        
        if request.query_params.get('format') == 'csv':
            from django.http import HttpResponse
            import csv
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="attendance_report.csv"'
            
            writer = csv.writer(response)
            writer.writerow(['Username', 'Timestamp'])
            for log in logs:
                writer.writerow([log.get('username'), log.get('timestamp')])
            return response
            
        return APIResponse(APIStatus.SUCCESS, data=logs)

class AttendanceAnalyticsView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        result = AttendanceService.get_analytics()
        if result.is_success:
            return APIResponse(APIStatus.SUCCESS, data=result.data)
        return APIResponse(APIStatus.ERROR, error=result.error)
