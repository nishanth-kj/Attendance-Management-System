from enum import Enum

class UserRole(Enum):
    SUPERADMIN = (1, "Super Admin")
    ADMIN = (2, "Admin")
    USER = (3, "User")

    def __init__(self, code: int, value: str):
        self._code = code
        self._value = value

    @property
    def code(self) -> int:
        return self._code

    @property
    def value(self) -> str:
        return self._value

    @classmethod
    def choices(cls):
        return [(key.code, key.value) for key in cls]
