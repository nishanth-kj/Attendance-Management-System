from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from config.utils import APIResponse
from config.constants.api_status import APIStatus

class HomeView(TemplateView):
    template_name = "config/templates/index.html"

class PingView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return APIResponse(
            status=APIStatus.SUCCESS,
            data={
                "status": "healthy", 
                "message": "Attendance Management System API is running."
            }
        )
