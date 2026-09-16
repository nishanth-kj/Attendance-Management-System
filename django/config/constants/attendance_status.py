from .base_enum import BaseEnum


class AttendanceStatus(BaseEnum):
    PRESENT = (1, "Present")
    ABSENT = (2, "Absent")
    LATE = (3, "Late")
