from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import LoginView, UserInfoView, UserDetailView, DemoView, RegisterView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', UserInfoView.as_view(), name='user_info'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    path('demo/', DemoView.as_view(), name='demo_info'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
