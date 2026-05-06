from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone
from config.constants.role import UserRole
from attendance.models import Log

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial users and logs'

    def handle(self, *args, **options):
        self.stdout.write('Starting database seeding...')

        # 1. Create Super Admin
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                password='admin',
                email='admin@example.com',
                role=UserRole.SUPERADMIN.code
            )
            self.stdout.write('Super Admin created (admin / admin)')
        else:
            self.stdout.write('Super Admin already exists')

        # 2. Create Admin
        if not User.objects.filter(username='ADMIN_user').exists():
            User.objects.create_user(
                username='ADMIN_user',
                password='ADMIN123',
                email='admin_staff@example.com',
                role=UserRole.ADMIN.code
            )
            self.stdout.write('Admin created (ADMIN_user / ADMIN123)')

        # 3. Create regular Users
        users_data = [
            {'username': 'User_user', 'email': 'user@example.com', 'role': UserRole.USER.code},
            {'username': 'john_doe', 'email': 'john@example.com', 'role': UserRole.USER.code},
        ]

        for data in users_data:
            if not User.objects.filter(username=data['username']).exists():
                user = User.objects.create_user(
                    password='User123' if data['username'] == 'User_user' else 'password123',
                    **data
                )
                self.stdout.write(f"User created: {data['username']}")
                
                # Create some dummy logs for users
                Log.objects.create(user=user, timestamp=timezone.now() - timezone.timedelta(days=1))
                Log.objects.create(user=user, timestamp=timezone.now() - timezone.timedelta(hours=2))
                self.stdout.write(f"Logs seeded for {data['username']}")

        self.stdout.write('Seeding completed successfully!')
