from enum import Enum

class ErrorCode(Enum):
    USER_NOT_FOUND = (404, "USER_NOT_FOUND", "User not found")
    UNAUTHORIZED = (403, "UNAUTHORIZED", "You do not have permission to perform this action")
    INVALID_CREDENTIALS = (401, "INVALID_CREDENTIALS", "Invalid username or password")
    FACE_NOT_DETECTED = (400, "FACE_NOT_DETECTED", "No face detected in the image")
    ALREADY_MARKED = (400, "ALREADY_MARKED", "Attendance already marked for today")
    INTERNAL_ERROR = (500, "INTERNAL_ERROR", "An internal server error occurred")

    def __init__(self, number: int, key: str, message: str):
        self._number = number
        self._key = key
        self._message = message

    @property
    def number(self) -> int:
        return self._number

    @property
    def key(self) -> str:
        return self._key

    @property
    def message(self) -> str:
        return self._message
