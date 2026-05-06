from django.urls import path

from .views import UserListView, UserDetailView, AttendanceMarkView, AttendanceLogView, AttendanceAnalyticsView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user_list'),
    path('users/<str:username>/', UserDetailView.as_view(), name='user_detail'),
    path('mark/', AttendanceMarkView.as_view(), name='mark_attendance'),
    path('logs/', AttendanceLogView.as_view(), name='get_logs'),
    path('analytics/', AttendanceAnalyticsView.as_view(), name='attendance_analytics'),
]
