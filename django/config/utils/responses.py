from rest_framework.response import Response
from rest_framework import status

from config.constants.response_status import ResponseStatus


class APIResponse(Response):
    """
    Standardized API Response matching CareerSync API.

    Views:
        return APIResponse(data).success()
        raise APIException(ErrorCode.INVALID_CREDENTIALS, ErrorMessage.INVALID_CREDENTIALS)
    """

    def __init__(self, data=None, **kwargs):
        self.response_data = data
        super().__init__(data=None, **kwargs)

    def success(self):
        self.data = {
            "status": ResponseStatus.SUCCESS.code,
            "data": self.response_data,
            "error": None
        }
        self.status_code = status.HTTP_200_OK
        return self

    def failure(self):
        error = self.response_data
        message = getattr(error, "message", str(error)) if error else "An error occurred"
        code = getattr(error, "code", 400) if error else 400
        field = getattr(error, "field", None) if error else None
        self.data = {
            "status": ResponseStatus.ERROR.code,
            "data": None,
            "error": {
                "message": message,
                "code": code,
                "field": field
            }
        }
        self.status_code = status.HTTP_200_OK
        return self
