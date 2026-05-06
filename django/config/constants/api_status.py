from enum import Enum

class APIStatus(Enum):
    SUCCESS = (1, "Success")
    ERROR = (0, "Error")

    def __init__(self, number: int, value: str):
        self._number = number
        self._value = value

    @property
    def number(self) -> int:
        return self._number

    @property
    def value(self) -> str:
        return self._value
