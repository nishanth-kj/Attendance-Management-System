from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone

from attendance.models import Log

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial users and logs'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🌱 Starting database seeding...'))

        # 1. Create Admin
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                password='admin123',
                email='admin@example.com',
                role='ADMIN'
            )
            self.stdout.write(self.style.SUCCESS('✅ Admin created (admin / admin123)'))
        else:
            self.stdout.write('⏭️ Admin already exists')

        # 2. Create Users
        users_data = [
            {'username': 'user_1', 'email': 'user1@example.com', 'role': 'USER'},
            {'username': 'user_2', 'email': 'user2@example.com', 'role': 'USER'},
            {'username': 'user_3', 'email': 'user3@example.com', 'role': 'USER'},
        ]

        for data in users_data:
            if not User.objects.filter(username=data['username']).exists():
                user = User.objects.create_user(
                    password='password123',
                    **data
                )
                self.stdout.write(self.style.SUCCESS(f"✅ User created: {data['username']}"))
                
                # Create some dummy logs for users
                Log.objects.create(user=user, timestamp=timezone.now() - timezone.timedelta(days=1))
                Log.objects.create(user=user, timestamp=timezone.now() - timezone.timedelta(hours=2))
                self.stdout.write(f"   📝 Logs seeded for {data['username']}")

        self.stdout.write(self.style.SUCCESS('✨ Seeding completed successfully!'))
