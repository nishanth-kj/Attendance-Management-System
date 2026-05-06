from enum import Enum

class Status(Enum):
    Active = (1, "Active")
    InActive = (0, "InActive")

    def __init__(self, code: int, value: str):
        self._code = code
        self._value = value

    @property
    def value(self) -> str:
        return self._value

    @property
    def code(self) -> int:
        return self._code
