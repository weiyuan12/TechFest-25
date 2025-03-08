from pydantic import BaseModel, Field 
from typing import Literal 
from fastapi import UploadFile 

__all__ = ("FactCheckingTextInput",
           "FactChecingImageInput")

class FactCheckingTextInput(BaseModel):
    messageId: str 
    type: Literal['Text'] = Field(description="Type of the message", default='Text')
    text: str 

class FactCheckingImageInput(BaseModel):
    messageId: str 
    type: Literal['Image'] = Field(description="Type of the message", default='Image')
    