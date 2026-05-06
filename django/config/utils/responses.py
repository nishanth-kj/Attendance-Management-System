from rest_framework.response import Response
from rest_framework import status
from config.constants.api_status import APIStatus
from config.constants.errors import ErrorCode

class APIResponse(Response):
    """
    Standardized API Response.
    Inherits from DRF Response.
    Usage: return APIResponse(APIStatus.SUCCESS, data=...)
    """
    def __init__(self, api_status, data=None, error=None, status_code=status.HTTP_200_OK, **kwargs):
        # Handle error formatting if it's an ErrorCode enum
        error_payload = None
        if error:
            if isinstance(error, ErrorCode):
                error_payload = {
                    "code": error.number,
                    "key": error.key,
                    "message": error.message
                }
            elif isinstance(error, str):
                error_payload = {
                    "code": 0,
                    "key": "GENERAL_ERROR",
                    "message": error
                }
            else:
                error_payload = error

        content = {
            "status": api_status.number,
            "data": data,
            "error": error_payload
        }
        super().__init__(data=content, status=status_code, **kwargs)
