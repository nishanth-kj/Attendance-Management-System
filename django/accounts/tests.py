from typing import Any
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from config.constants.response_status import ResponseStatus
from config.constants.role import UserRole
from config.utils.validation import Validator
from config.exceptions.api_exception import APIException
from .models import User


class UserModelTest(TestCase):
    def setUp(self):
        self.super_admin_user = User.objects.create_user(
            username='superadmin',
            password='password',
            role=User.SUPERADMIN
        )
        self.admin_user = User.objects.create_user(
            username='admin',
            password='password',
            role=User.ADMIN
        )
        self.regular_user = User.objects.create_user(
            username='user',
            password='password',
            role=User.USER
        )

    def test_user_roles(self):
        self.assertTrue(self.super_admin_user.is_super_admin())
        self.assertTrue(self.admin_user.is_admin())
        self.assertTrue(self.regular_user.is_regular_user())

    def test_admin_property(self):
        self.assertTrue(self.super_admin_user.is_admin())
        self.assertFalse(self.regular_user.is_admin())

    def test_user_to_dict(self):
        d = self.admin_user.to_dict()
        self.assertEqual(d['username'], 'admin')
        self.assertEqual(d['role'], UserRole.ADMIN.code)
        self.assertIn('id', d)


class ValidatorTest(TestCase):
    def test_validator_required(self):
        v = Validator({'name': 'John', 'empty': '   '})
        self.assertEqual(v.required('name'), 'John')
        with self.assertRaises(APIException):
            v.required('missing')
        with self.assertRaises(APIException):
            v.required('empty')

    def test_validator_min_length(self):
        v = Validator({'password': 'pass'})
        with self.assertRaises(APIException):
            v.required('password', min_length=8)

    def test_validator_integer(self):
        v = Validator({'role': '2', 'invalid': 'abc'})
        self.assertEqual(v.integer('role'), 2)
        with self.assertRaises(APIException):
            v.integer('invalid')


class AuthAPITest(APITestCase):
    client: Any

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='test_login_user',
            password='SecretPassword123',
            email='test@example.com',
            role=User.USER
        )

    def test_demo_view(self):
        response: Any = self.client.get('/auth/demo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.SUCCESS.code)
        self.assertIn('roles', response.data['data'])
        self.assertIsNone(response.data['error'])

    def test_login_success(self):
        response: Any = self.client.post('/auth/login/', {
            'username': 'test_login_user',
            'password': 'SecretPassword123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.SUCCESS.code)
        self.assertIn('token', response.data['data'])
        self.assertEqual(response.data['data']['user']['username'], 'test_login_user')

    def test_login_invalid_credentials(self):
        response: Any = self.client.post('/auth/login/', {
            'username': 'test_login_user',
            'password': 'WrongPassword'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.ERROR.code)
        self.assertIsNone(response.data['data'])
        self.assertEqual(response.data['error']['code'], 401)

    def test_register_and_accounts_route_compatibility(self):
        # Test /accounts/register/ route compatibility
        response: Any = self.client.post('/accounts/register/', {
            'username': 'newuser1',
            'password': 'password123',
            'email': 'new@example.com',
            'role': 3
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.SUCCESS.code)
        self.assertEqual(response.data['data']['username'], 'newuser1')

    def test_register_duplicate_username(self):
        response: Any = self.client.post('/auth/register/', {
            'username': 'test_login_user',
            'password': 'password123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.ERROR.code)
        self.assertEqual(response.data['error']['field'], 'username')

    def test_user_info_view(self):
        self.client.force_authenticate(user=self.user)
        response: Any = self.client.get('/auth/me/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], ResponseStatus.SUCCESS.code)
        self.assertEqual(response.data['data']['username'], 'test_login_user')
