from config.constants.errors import ErrorCode

class APIException(Exception):
    """
    Custom exception class for the API.
    Can be raised within services or views to trigger a standardized error response.
    """
    def __init__(self, error_code: ErrorCode, data=None, status_code=400, field=None):
        self.error_code = error_code
        self.data = data
        self.status_code = status_code
        self.field = field
        super().__init__(self.error_code.message)
