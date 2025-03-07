from langchain_openai import ChatOpenAI
import os 
from dotenv import load_dotenv 

class LLMSetup:
    def __init__(self):
        load_dotenv(override=True)

        self.model = ChatOpenAI(model="gpt-4o-mini",temperature=0)

    def get_model(self):
        return self.model

