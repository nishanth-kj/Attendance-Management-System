from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from config.constants.error_code import ErrorCode
from config.constants.error_message import ErrorMessage
from config.exceptions.api_exception import APIException
from config.logger import logger


class AuthService:
    """Authentication service matching CareerSync API pattern."""

    @classmethod
    def login_user(cls, request, username, password):
        logger.info(f"Attempting login for user: {username}")
        user = authenticate(request, username=username, password=password)
        if not user or not user.is_active:
            logger.warning(f"Failed login attempt for user: {username}")
            raise APIException(ErrorCode.INVALID_CREDENTIALS, ErrorMessage.INVALID_CREDENTIALS)

        refresh = RefreshToken.for_user(user)
        result = {
            "token": str(refresh.access_token),
            "refresh": str(refresh),
            "user": user.to_dict()
        }
        logger.info(f"User {username} logged in successfully.")
        return result
