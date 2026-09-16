from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from config.utils.responses import APIResponse


def index(request):
    return render(request, 'config/templates/index.html')


class HomeView(TemplateView):
    template_name = "config/templates/index.html"


class PingView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        data = {
            "status": "healthy",
            "message": "Attendance Management System API is running."
        }
        return APIResponse(data).success()

