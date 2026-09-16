from config.constants.base_enum import BaseEnum


class ErrorMessage(BaseEnum):
    USER_NOT_FOUND = (404, "User not found")
    NOT_FOUND = (404, "Resource not found")
    UNAUTHORIZED = (403, "You do not have permission to perform this action")
    INVALID_CREDENTIALS = (401, "Invalid username or password")
    VALIDATION_ERROR = (400, "Validation error")
    FILE_REQUIRED = (400, "File is required")
    FACE_NOT_DETECTED = (400, "No face detected in the image")
    ALREADY_MARKED = (400, "Attendance already marked for today")
    INTERNAL_ERROR = (500, "An internal server error occurred")

    @property
    def message(self) -> str:
        return self._value
