from enum import Enum


class BaseEnum(Enum):
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
        return [(item.code, item.value) for item in cls]
