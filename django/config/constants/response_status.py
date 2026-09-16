from .base_enum import BaseEnum


class ResponseStatus(BaseEnum):
    SUCCESS = (1, "Success")
    ERROR = (0, "Error")
