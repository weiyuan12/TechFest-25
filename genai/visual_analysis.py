from dotenv import load_dotenv 
from http import HTTPStatus
from fastapi import UploadFile, HTTPException
import base64 
from pydantic import BaseModel, Field

from langchain_openai import ChatOpenAI 
from langchain_core.prompts import ChatPromptTemplate

load_dotenv(override=True)

class ImageOutput(BaseModel):
    text: str = Field(description="Markdown text of the extracted content from the image")

def visual_analysis(file: UploadFile):
    # Instantiate the model - using GPT4o for the vision
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0)

    try:
        # Encode the image_bytes
        image_bytes = file.file.read()
        encoded = base64.b64encode(image_bytes).decode("utf-8")

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """
                    You function as an intelligent web scraping tool. You are responsible in converting image content to text.
                    Users will supply a screenshot that may contain messages, description, conversation messages or any key information. 
                    You are to extract all the important information and messages and provide detailed description 
                    of the image and format the extracted information in Markdown format. 
                    """
                ),
                (
                    "user", 
                    [
                        {
                            "type": "image_url",
                            "image_url": {"url": "data:image/jpeg;base64,{image_data}"}
                        }
                    ]
                )
            ]
        )

        structured_llm = model.with_structured_output(ImageOutput)

        image_chain = prompt | structured_llm

        response: ImageOutput = image_chain.invoke({"image_data": encoded})
        return response.model_dump()
    
    except Exception as e:
        raise HTTPException(
            status_code=int(HTTPStatus.UNPROCESSABLE_ENTITY),
            detail="Error when extracting content from image"
        )

