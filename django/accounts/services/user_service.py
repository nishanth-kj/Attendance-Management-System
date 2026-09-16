import base64
from django.contrib.auth import get_user_model

from attendance.services.biometric_service import BiometricService
from config.constants.error_code import ErrorCode
from config.constants.error_message import ErrorMessage
from config.constants.role import UserRole
from config.exceptions.api_exception import APIException
from config.logger import logger

User = get_user_model()


class UserService:
    """User management service matching CareerSync API pattern."""

    @staticmethod
    def user_to_dict(user):
        """Manual serialization for User model."""
        if hasattr(user, 'to_dict'):
            return user.to_dict()

        image_data = None
        if getattr(user, 'image_blob', None):
            encoded = base64.b64encode(user.image_blob).decode('utf-8')
            image_data = f"data:image/{getattr(user, 'image_format', 'jpeg') or 'jpeg'};base64,{encoded}"

        full_name = f"{user.first_name} {user.last_name}".strip()
        display_name = full_name if full_name else user.username

        return {
            'id': user.id,
            'username': user.username,
            'name': display_name,
            'email': user.email,
            'role': user.role,
            'image_url': image_data
        }

    @classmethod
    def create_user(cls, username, password, email='', role=UserRole.USER.code, image_input=None):
        logger.info(f"Creating user: {username} with role: {role}")
        if User.objects.filter(username=username).exists():
            raise APIException(ErrorCode.VALIDATION_ERROR, "Username already exists", field="username")

        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                role=role
            )

            if image_input:
                cls.update_user_biometrics(user, image_input)

            logger.info(f"User created successfully: {user.username}")
            return cls.user_to_dict(user)
        except Exception as e:
            logger.exception(f"Failed to create user {username}: {e}")
            raise APIException(ErrorCode.INTERNAL_ERROR, str(e))

    @staticmethod
    def update_user_biometrics(user, image_input):
        """Updates user's saved image and biometric face embedding."""
        if isinstance(image_input, str) and 'base64,' in image_input:
            format_part, imgstr = image_input.split(';base64,')
            ext = format_part.split('/')[-1]
            user.image_blob = base64.b64decode(imgstr)
            user.image_format = ext

            encoding = BiometricService.extract_encoding(user.image_blob)
            if encoding is not None:
                user.face_embedding = encoding.tobytes()

            user.save()
        return user

    @classmethod
    def get_user_list(cls, role=None):
        if role:
            users = User.objects.filter(role=role).order_by('-id')
        else:
            users = User.objects.all().order_by('-id')
        return [cls.user_to_dict(u) for u in users]

    @classmethod
    def get_user_detail(cls, pk):
        try:
            user = User.objects.get(pk=pk)
            return cls.user_to_dict(user)
        except User.DoesNotExist:
            raise APIException(ErrorCode.USER_NOT_FOUND, ErrorMessage.USER_NOT_FOUND)

    @classmethod
    def get_user_by_username(cls, username):
        try:
            user = User.objects.get(username=username)
            return cls.user_to_dict(user)
        except User.DoesNotExist:
            raise APIException(ErrorCode.USER_NOT_FOUND, ErrorMessage.USER_NOT_FOUND)

    @classmethod
    def delete_user(cls, user_id):
        try:
            user = User.objects.get(pk=user_id)
            user.delete()
            logger.info(f"User {user_id} deleted successfully.")
            return None
        except User.DoesNotExist:
            raise APIException(ErrorCode.USER_NOT_FOUND, ErrorMessage.USER_NOT_FOUND)
