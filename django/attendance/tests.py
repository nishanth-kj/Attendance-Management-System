from typing import Any
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from config.constants.response_status import ResponseStatus
from .models import Log

User = get_user_model()


class LogModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='password'
        )

    def test_log_creation(self):
        log = Log.objects.create(user=self.user)
        self.assertEqual(log.user.username, 'testuser')
        self.assertTrue(log.timestamp)

    def test_log_str(self):
        log = Log.objects.create(user=self.user)
        self.assertIn('testuser', str(log))

    def test_log_to_dict(self):
        log = Log.objects.create(user=self.user)
        d = log.to_dict()
        self.assertEqual(d['username'], 'testuser')
        self.assertIn('timestamp', d)


class AttendanceAPITest(APITestCase):
    client: Any

    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(username='admin', password='password', role=User.ADMIN)
        self.client.force_authenticate(user=self.admin)
        self.student = User.objects.create_user(username='stu1', password='password', role=User.USER)

    def test_student_list(self):
        url = reverse('user_list')
        response: Any = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.SUCCESS.code)
        self.assertTrue(any(s['username'] == 'stu1' for s in response.data['data']))

    def test_attendance_logs(self):
        Log.objects.create(user=self.student)
        url = reverse('get_logs')
        response: Any = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.SUCCESS.code)
        self.assertEqual(len(response.data['data']), 1)
        self.assertEqual(response.data['data'][0]['username'], 'stu1')

    def test_attendance_analytics(self):
        url = reverse('attendance_analytics')
        response: Any = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.SUCCESS.code)
        self.assertIn('summary', response.data['data'])
        self.assertIn('trends', response.data['data'])

    def test_mark_attendance_missing_image(self):
        url = reverse('mark_attendance')
        response: Any = self.client.post(url, {})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.ERROR.code)
        self.assertEqual(response.data['error']['field'], 'image')

    def test_ping_endpoint(self):
        response: Any = self.client.get('/api/admin/ping/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.SUCCESS.code)
        self.assertEqual(response.data['data']['status'], 'healthy')
