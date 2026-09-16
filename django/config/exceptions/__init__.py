from rest_framework.exceptions import (
    AuthenticationFailed,
    NotAuthenticated,
    NotFound,
    PermissionDenied,
    ValidationError,
)
from rest_framework.views import exception_handler

from config.constants.error_code import ErrorCode
from config.constants.error_message import ErrorMessage
from config.exceptions.api_exception import APIException
from config.logger import logger
from config.utils.responses import APIResponse


def custom_exception_handler(exc, context):
    view = context.get("view") if context else None
    view_name = view.__class__.__name__ if view else "unknown"

    if isinstance(exc, APIException):
        logger.error(f"Error in {view_name}: {exc.message}")
        return APIResponse(exc).failure()

    if isinstance(exc, (NotAuthenticated, AuthenticationFailed)):
        return APIResponse(APIException(ErrorCode.INVALID_CREDENTIALS, ErrorMessage.INVALID_CREDENTIALS)).failure()

    if isinstance(exc, PermissionDenied):
        return APIResponse(APIException(ErrorCode.UNAUTHORIZED, ErrorMessage.UNAUTHORIZED)).failure()

    if isinstance(exc, NotFound):
        return APIResponse(APIException(ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND)).failure()

    if isinstance(exc, ValidationError):
        field = None
        detail = getattr(exc, "detail", None)
        if isinstance(detail, dict) and detail:
            field = next(iter(detail), None)
        return APIResponse(
            APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)
        ).failure()

    logger.exception("Unhandled error in %s: %s", view_name, exc)
    response = exception_handler(exc, context)
    if response is not None:
        return APIResponse(APIException(ErrorCode.INTERNAL_ERROR, ErrorMessage.INTERNAL_ERROR)).failure()

    return APIResponse(APIException(ErrorCode.INTERNAL_ERROR, ErrorMessage.INTERNAL_ERROR)).failure()

