from .base_enum import BaseEnum


class APIStatus(BaseEnum):
    SUCCESS = (1, "Success")
    ERROR = (0, "Error")

    @property
    def number(self) -> int:
        return self._code
