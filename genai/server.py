import uvicorn 
from http import HTTPStatus
from fastapi import FastAPI 
from typing import Any 

from models import FactCheckingTextInput
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
    user_input = text_input.text
    agent_graph = create_agent_graph()
    
    config: dict[str, Any] = {"configurable": {"thread_id": text_input.messageId}}

    result = agent_graph.invoke({"messages": [user_input]}, config)

    structured_response = result.get('structured_response')

    print(structured_response.dict())
    return structured_response.dict()



if __name__ == "__main__":
    uvicorn.run('server:app', reload=True)