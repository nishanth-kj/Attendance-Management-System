from enum import Enum

class ResponseStatus(Enum):
    SUCCESS = (1, "Success")
    ERROR = (0, "Error")

    def __init__(self, code: int, value: str):
        self._code = code
        self._value = value

    @property
    def code(self) -> int:
        return self._code

    @property
    def value(self) -> str:
        return self._value
