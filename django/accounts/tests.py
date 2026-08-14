from django.test import TestCase

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
