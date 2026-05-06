from enum import IntEnum

class AttendanceStatus(IntEnum):
    PRESENT = 1
    ABSENT = 2
    LATE = 3

    @classmethod
    def choices(cls):
        return [(key.value, key.name.title()) for key in cls]
