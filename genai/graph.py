from http import HTTPStatus
from textwrap import dedent 
from dotenv import load_dotenv

from fastapi import HTTPException

from langchain_core.tools import Tool
from langgraph.graph.graph import CompiledGraph
from langgraph.checkpoint.memory import MemorySaver
from langchain_community.tools.wikipedia.tool import WikipediaQueryRun, WikipediaAPIWrapper
from langchain_community.tools.wikidata.tool import WikidataQueryRun, WikidataAPIWrapper
from langchain_community.tools.arxiv.tool import ArxivQueryRun, ArxivAPIWrapper
from langchain_community.tools.pubmed.tool import PubmedQueryRun, PubMedAPIWrapper
from langchain_community.tools.ddg_search.tool import DuckDuckGoSearchRun, DuckDuckGoSearchAPIWrapper
from langchain_google_community import GoogleSearchAPIWrapper, GoogleSearchRun
from langgraph.prebuilt import create_react_agent

from pydantic import BaseModel, Field
from typing import Literal, Optional, List

from llm_setup import LLMSetup

load_dotenv(override=True)

__all__ = ("create_agent_graph")


prompt: str = dedent(
    """
    You are a specialised fact checking agent designed to assist users 
    in identifying misinformation. 

    Agents are granted access to web search tools such as GoogleSearch, Wikipedia,
    Wikidata, Arxiv, Pubmed and DuckDuckGoSearch. If possible, you are to first
    try it out with GoogleSearch, to look for the relevant information. You are
    provided with the ability to search through these tools to check the 
    information user provided. You should also cite references to the websites
    if you have referred to these websites as knowledge bases. You should
    generate references using a URL based on the URLs provided

    1. You are to categorised the message users provided into the following category:
    - scam: Intended to obtain money/personal information via deception
    - illicit: Other potential illicit activity that are not scams, e.g. moneylending, or prostitutions
    - info: Messages intended to inform/convince/mislead a broad base of people
        - You will be required to provide a truthscore for messages categorised as info. 
        - If messages is entirely false, provide a score of 0,
        - If message is entirely true, provide a score of 5
    - satire: Similar to info, but clearly satirical in nature
    - spam: Unsolicited spam, such as marketing messages
    - legitimate: Legitimate source, typically meant for the individual as opposed to a broad base, 
                  and can't be accessed without knowledge of the individual's circumstances e.g. transactional message
    - irrlevant: Trivial/banal messages with nothing to assess
    - unsure: Unsure of what is the message about

    2. Based on the categories of the message, you are to provide some reasoning behind the category and the truth score.
    3. List down the website citations you referred to which aids in making the decision. 
    """
)

class ResponseFormat(BaseModel):
    """
    Respond to the user in the folllowing format
    """
    category: Literal["scam", "illicit", "info", "satire", "spam", "legitimate", "irrelevant", "unsure"] = Field(description="Assigned category of the message")
    truthscore: Optional[int | None] = Field(description="truthscore assigned: (0 to 5) if is categorised as info, 0 entirely false, 5 entirely true, otherwise set to None", default=None)
    reasoning: str = Field(description="The reasoning behind the category and the truth score.")
    citations: List[str] = Field(description="List of website citations referred to aid in making the decision")



def create_agent_graph() -> CompiledGraph:
    """
    Create the Factchecker Agent Graph

    Args:
        None

    Returns: 
        graph: CompiledGraph
    """
    llm = LLMSetup().get_model()

    try:
        # Instantiate tools
        wikipedia: WikipediaQueryRun = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())
        wikidata: WikidataQueryRun = WikidataQueryRun(api_wrapper=WikidataAPIWrapper())
        duck_duck_go: DuckDuckGoSearchRun = DuckDuckGoSearchRun(api_wrapper=DuckDuckGoSearchAPIWrapper())
        arxiv: ArxivQueryRun = ArxivQueryRun(api_wrapper=ArxivAPIWrapper())
        pubmed: PubmedQueryRun = PubmedQueryRun(api_wrapper=PubMedAPIWrapper())
        search = GoogleSearchAPIWrapper()
        googleSearchTool = Tool(
            name="google_search",
            description="Search Google for recent results.",
            func=search.run,
        )

        return create_react_agent(
            model=llm,
            tools=[googleSearchTool, wikipedia, wikidata, duck_duck_go, arxiv, pubmed],
            checkpointer=MemorySaver(),
            prompt=prompt,
            response_format=ResponseFormat
        )
    except Exception as e:
        raise HTTPException(
            status_code=int(HTTPStatus.UNPROCESSABLE_ENTITY),
            detail="Error when running factchecking agent"
        )

if __name__ == "__main__":
    from uuid import uuid4
    from typing import Any 

    agent_id = str(uuid4())

    agent_graph = create_agent_graph()
    
    config: dict[str, Any] = {"configurable": {"thread_id": agent_id}}
    user_input: str = ""
    
    while user_input != "exit":
        user_input = input("User: ")
        print(agent_graph.invoke({"messages": [user_input]}, config))

   
