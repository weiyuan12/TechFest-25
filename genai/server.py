import uvicorn 
from http import HTTPStatus
from fastapi import FastAPI, UploadFile, HTTPException
from pathlib import Path
from typing import Any 

from models import FactCheckingTextInput
from visual_analysis import visual_analysis, ImageOutput
from graph import create_agent_graph


app: FastAPI = FastAPI()

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
        
        config: dict[str, Any] = {"configurable": {"thread_id": text_input.messageId}}

        result = agent_graph.invoke({"messages": [user_input]}, config)

        structured_response = result.get('structured_response')

        # print(structured_response.dict())
        return structured_response.dict()
    except:
        raise


@app.post("/image/", status_code=HTTPStatus.OK)
@app.post("/image", status_code=HTTPStatus.OK)
async def check_image(
    messageId: str,
    files: UploadFile # Only accept .jpg, .jpeg, .png images
):
    """
    Fact check image input

    Args:
        image_input: FactCheckingImageInput: Required image file

    Returns:
        response: ResponseFormat
    """
    try:
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
        config: dict[str, Any] = {"configurable": {"thread_id": messageId}}

        # Invoke Agentic graph
        result = agent_graph.invoke({"messages": [text_content]}, config)

        # Return as structured response
        structured_response = result.get('structured_response')

        return structured_response.dict()
    
    except Exception as e:
        raise 



if __name__ == "__main__":
    uvicorn.run('server:app', reload=True)