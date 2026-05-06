from config.constants.api_status import APIStatus

class ServiceResult:
    """Standardized result for service operations"""
    def __init__(self, status=APIStatus.SUCCESS, data=None, error=None, message=None, status_code=200):
        self.status = status
        self.data = data
        self.error = error
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        return {
            'status': self.status.number,
            'data': self.data,
            'error': self.error,
            'message': self.message,
            'status_code': self.status_code
        }

    @property
    def is_success(self):
        return self.status == APIStatus.SUCCESS

class BaseService:
    """Base class for all business logic services"""
    
    @staticmethod
    def success(data=None, message="Success", status_code=200):
        return ServiceResult(status=APIStatus.SUCCESS, data=data, message=message, status_code=status_code)

    @staticmethod
    def failure(error="An error occurred", message="Error", status_code=400):
        return ServiceResult(status=APIStatus.ERROR, error=error, message=message, status_code=status_code)
