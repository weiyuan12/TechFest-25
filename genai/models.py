from pydantic import BaseModel, Field 
from typing import Literal 

__all__ = ("FactCheckingTextInput")

class FactCheckingTextInput(BaseModel):
    messageId: str 
    type: Literal['Text'] = Field(description="Type of the message", default='Text')
    text: str 

