from typing import Optional, Union

from config.constants.error_code import ErrorCode
from config.constants.error_message import ErrorMessage


class APIException(Exception):
    """
    Custom exception for standardized API errors.

    Usage:
        raise APIException(ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND)
        raise APIException(ErrorCode.VALIDATION_ERROR, ErrorMessage.VALIDATION_ERROR, field="email")
    """

    def __init__(self, error_code: ErrorCode, error_message: Optional[Union[ErrorMessage, str]] = None, field=None):
        self.error_code = error_code
        self.error_message = error_message
        self.field = field
        super().__init__(self.message)

    @property
    def code(self) -> int:
        return self.error_code.code

    @property
    def message(self) -> str:
        if isinstance(self.error_message, ErrorMessage):
            return self.error_message.message
        if self.error_message:
            return str(self.error_message)
        return self.error_code.value
