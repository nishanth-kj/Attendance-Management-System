import os

from config.constants.error_code import ErrorCode
from config.constants.error_message import ErrorMessage
from config.exceptions.api_exception import APIException


class Validator:
    """
    Generic request validator matching CareerSync API. Each method returns the field value.

    Usage:
        v = Validator(request.data)
        username = v.required("username")
        password = v.required("password", min_length=6)
        role = v.integer("role", default=3)
    """

    def __init__(self, data=None):
        self.raw = data or {}

    def get(self, field, default=None):
        if hasattr(self.raw, "get"):
            return self.raw.get(field, default)
        return default

    def required(self, field, min_length=None):
        value = self.get(field)
        if value is None or (isinstance(value, str) and not value.strip()):
            raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)
        if isinstance(value, str):
            value = value.strip()
        if min_length is not None and len(str(value)) < min_length:
            raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)
        return value

    def optional(self, field, default=None):
        value = self.get(field, default)
        if value is None:
            return default
        if isinstance(value, str):
            value = value.strip()
            return default if value == "" else value
        return value

    def email(self, field="email"):
        value = self.required(field)
        if "@" not in value:
            raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)
        return value

    def integer(self, field, default=None, required=False):
        value = self.get(field)
        if value is None or value == "":
            if required:
                raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)
            return default
        try:
            return int(value)
        except (TypeError, ValueError):
            raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)

    def float(self, field, default=None, required=False):
        value = self.get(field)
        if value is None or value == "":
            if required:
                raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)
            return default
        try:
            return float(value)
        except (TypeError, ValueError):
            raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)

    def boolean(self, field, default=None):
        value = self.get(field)
        if value is None or value == "":
            return default
        if isinstance(value, bool):
            return value
        if isinstance(value, str):
            lowered = value.lower()
            if lowered in ("true", "1", "yes"):
                return True
            if lowered in ("false", "0", "no"):
                return False
        if isinstance(value, int):
            return bool(value)
        raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)

    def file(self, field="file", extensions=None, max_size=None):
        value = self.get(field)
        if not value:
            raise APIException(ErrorCode.FILE_REQUIRED, ErrorMessage.FILE_REQUIRED, field=field)
        if extensions:
            ext = os.path.splitext(getattr(value, "name", ""))[1].lower()
            if ext not in extensions:
                raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)
        if max_size is not None and getattr(value, "size", 0) > max_size:
            raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field=field)
        return value

