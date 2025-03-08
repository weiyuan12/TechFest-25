from __future__ import annotations

from typing import Any, Optional, Dict 

__docs__ = """
Contains API Exception
"""

__all__ = (
    # API
    "AtlasAPIException"
)

class AtlasException(Exception):
    """
    Standard Atlas Exception class, provides an exception method to structure 
    the error return format.
    """
    def exception(
            self,
            *args: Any,
            **kwargs: Any, 
    ) -> Any:
        """
        Method for structuring the error return format

        Args:
            *args (Any): Args for the function
            **kwargs (Any): Kwargs for the function
        
        Returns:
            Any: Structure error format
        """

class AtlasRESTException(AtlasException):
    """
    Atlas REST Exception class.
    This is base class for all API related source
    """

class AtlasAPIException(AtlasRESTException):
    """
    Standard Atlas Exception API Exception class. This exception is
    raised whenever an error occurs during API exceptions. It is used 
    to structure the outgoing API exception as an APIError.

    Attributes:
        status_code (int): REST API status code
        message (str): Brief message summarising error
        request (Optional[Dict[str, Any]]): Request body
        details (Optional[Dict[str, Any]]): More details on the error
    """
    def __init__(self, 
                 status_code: int, 
                 message: str, 
                 request: Optional[Dict[str, Any]] = None, 
                 details: Optional[Dict[str, Any]] = None):
        self.status_code = status_code
        self.message = message 
        self.request = request or {}
        self.details = details or {}
    
    @property
    def code(self) -> int:
        """
        Convenience function for retrieving the status code 

        Returns:
            int: REST status code
        """
        return self.status_code 
    
    def exception(self, **kwargs: Any) -> Dict[str, Any]:
        """
        Structures the error as a dictionary with the APIError schema
        to be returned as a response

        Args:
            **kwargs (Any): Kwargs to be overridden
        
        Returns:
            Dict[str, Any]: Structured APIError
        """
        return {
            **{
                "code": self.code,
                "message": self.message,
                "request": self.request, 
                "details": self.details, 
            },
            **kwargs
        }