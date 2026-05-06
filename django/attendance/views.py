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
        role = request.query_params.get('role', 'USER')
        result = UserService.get_user_list(role=role)
        return APIResponse(APIStatus.SUCCESS, data=result.data)

    def post(self, request):
        result = UserService.create_user(
            username=request.data.get('username'),
            password=request.data.get('password'),
            email=request.data.get('email', ''),
            role=3,
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
