import uvicorn 
from http import HTTPStatus
from fastapi import FastAPI, UploadFile, HTTPException, Form
from pathlib import Path
from typing import Any 
from dotenv import load_dotenv

from models import FactCheckingTextInput
from visual_analysis import visual_analysis, ImageOutput
from graph import create_agent_graph
from langfuse.callback import CallbackHandler
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(override=True)

# Initialize Langfuse CallbackHandler for Langchain (tracing)
langfuse_handler = CallbackHandler()

app: FastAPI = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/", status_code=HTTPStatus.OK)
def read_root():
    return "hello world"

@app.post("/text/", status_code=HTTPStatus.OK)
@app.post("/text", status_code=HTTPStatus.OK)
async def check_text(
    text_input: FactCheckingTextInput
):
    """
    Fact check text input

    Args:
        text_input: FactCheckingTextInput: Required text inputs

    Returns:
        response: ResponseFormat
    """
    try:
        user_input = text_input.text
        agent_graph = create_agent_graph()
        
        config: dict[str, Any] = {"configurable": {"thread_id": text_input.messageId},
                                  "callbacks": [langfuse_handler]}

        result = agent_graph.invoke({"messages": [user_input]}, config)
        print(result)

        structured_response = result.get('structured_response', None)
        messages = result.get('messages', None)

        # print(structured_response.dict())
        return {"messages": messages, "structured_response": structured_response.dict()}
    except:
        raise


@app.post("/image/", status_code=HTTPStatus.OK)
@app.post("/image", status_code=HTTPStatus.OK)
async def check_image(
    files: UploadFile,
    messageId: str = Form(...)
):
    """
    Fact check image input

    Args:
        image_input: FactCheckingImageInput: Required image file

    Returns:
        response: ResponseFormat
    """
    try:
        messageId = str(messageId)
        image_file = files

        MAX_FILE_SIZE = 10 * 1024 * 1024 #10 MB in Bytes
        VALID_FILE_TYPE = ['.jpg', '.jpeg', '.png']
        if image_file.size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=int(HTTPStatus.REQUEST_ENTITY_TOO_LARGE),
                detail="File size is too large"
            )
        
        # Check file extension
        file_extension = Path(image_file.filename).suffix
        if file_extension not in VALID_FILE_TYPE:
            raise HTTPException(
                status_code=int(HTTPStatus.UNSUPPORTED_MEDIA_TYPE),
                detail="File type is not valid"
            )
        
        # Extract content from the image to Markdown format 
        image_results = visual_analysis(image_file)
        text_content = image_results.get('text', None)

        # Instantiate Agent Graph
        agent_graph = create_agent_graph()
        
        # LangGraph Config 
        config: dict[str, Any] = {"configurable": {"thread_id": messageId},
                                  "callbacks": [langfuse_handler]}

        # Invoke Agentic graph
        result = agent_graph.invoke({"messages": [text_content]}, config)
        print(result)

        # Return as structured response
        structured_response = result.get('structured_response')
        messages = result.get('messages', None)

        return {"messages": messages, "structured_response": structured_response.dict()}
    
    except Exception as e:
        raise 



if __name__ == "__main__":
    uvicorn.run('server:app',  host="0.0.0.0", reload=True)