from enum import Enum

class ErrorStatus(Enum):
    VALIDATION = (422, "validation")
    AUTHENTICATION = (401, "authentication")
    AUTHORIZATION = (403, "authorization")
    NOT_FOUND = (404, "not_found")
    SERVER_ERROR = (500, "server_error")
    API_ERROR = (400, "api_error")

    def __init__(self, code: int, value: str):
        self._code = code
        self._value = value

    @property
    def code(self) -> int:
        return self._code

    @property
    def value(self) -> str:
        return self._value
