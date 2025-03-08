# FactChecking MultiAgentic System 

## Introduction
In today's information-rich society, the continuous surge of available information has also led to an increasing spread of misinformation, myths, and unverified claims. Furthermore, the presence of social media and online platforms greatly facilitate this process, as each user can easily create and disseminate information. In the context of such a rapid spread of disinformation, the problem of identifying and refuting it becomes extremely important. Fake news, or deliberately fabricated false information, is used to mislead the audience or manipulate public opinion, which can
have serious consequences for society. 

For instance, during the COVID-19 pandemic, misinformation spread rapidly, which causes further uncertainty and widespread anxiety. False claims about treatments, vaccines, and preventive measures proliferated on social media, often complicating public health efforts. This surge of misinformation posed significant challenges, undermining trust and potentially endangering public health responses.

Therefore, to combat disinformation, there is a need to develop effective tools for automated fact-checking.

## Proposed Solution
Traditionally, fact-checking methods were manual, requiring human experts to verify each and every information and provide justification to ensure credibility. However, with the advancements in large language models (LLMs), such as OpenAI's GPT-4o-mini, it introduces powerful reasoning capabilities, enabling automated classification of messages and providing clear justifications for their assigned labels. LLMs like GPT-4o-mini have proved its advanced capabilities such as:
- Generating coherent and contextually relevant text, making them invaluable in providing explanations
- Accurately naunces and linguistics unique to the language
- Sophisticated understanding of language allows them to anlayse and detech emotional tone within texts

Furthermore, LLM-based systems that not only have strong reasoning capabilities, but can also execute actions with the help of provided “tools”.

This shift significantly streamlines and automates the fact-checking process, while enhancing accuracy and efficiency in combating misinformation.

Therefore, we designed and proposed utilising Multiagentic framework to create a multiagentic factchecking workflow. 

## Introduction of Agents
By definition, an agent is anything that can be viewed as perceiving its environment through sensors and acting upon that environment through actuators.

The app consists of an agent (LLM) and multiple web search tools. Whenever a new message is received, the agent will be first called to decide if we should use tools. Based on the agent (LLM) decision, it will run a loop:
1. If the agent said to take an action (i.e. call tool via API), we will run the tools and pass the results back to the agent
2. If the agent did not ask to run tools, we will finish (respond to the user)

After which, with all the information gathered, it then makes a judgement and provides its reasoning behind its judgement.

An agent architecture would be as follow:
<p align="center">
  <img align="center" alt="Mockup" title="Mockup" src="assets/agentic_architecture.png" width="540" ></img>
</a>
</p>

Therefore, the agentic workflow can be illustrated as below:
<p align="center">
  <img align="center" alt="Mockup" title="Mockup" src="assets/example_flow.png" width="540" ></img>
</a>
</p>

## Benefits of Agentic Workflow
One of the most common pitfalls of LLMs are that LLMs highly succumb to hallucinations, by just asking it to fact check without any references or knowledge base, it will result in inaccurate and hallucinated results. In addition, knowledge sources of LLMs have a cut-off date. The training data for GPT-4o-mini model is limited to data from October 2023 or earlier, hence, they do not have up-to-date information, resulting in a lower accuracy of fact-checking responses. 

Hence, by providing it with real-time Search API that can allow agents to receive up-to-date information. 
<p align="center">
  <img align="center" alt="Mockup" title="Mockup" src="assets/comparison.png" width="540" ></img>
</a>
</p>

This shows that Agentic framework with relevant Web search tools will reduce hallucinations from LLM and return up-to-date information to users. 

## Setup and Installation 
1. Clone the repository
```
git clone https://github.com/weiyuan12/TechFest-25.git
cd TechFest-25
```

2. Configure the Environment Variables

Create a `.env` file in the genai folder to configure variables for the genAI backend. Populate the `.env` file with the following variables:
```
OPENAI_API_KEY=
GOOGLE_API_KEY=
GOOGLE_CSE_ID=
LANGFUSE_PUBLIC_KEY=
LANGFUSE_SECRET_KEY=
LANGFUSE_HOST=
```

3. Set up Python Virtual Environment
```
# Create virtual environment
python3.12 -m venv .venv

# Activate virtual environment
source .venv/bin/activate

# Pip install all required libraries
pip install -r requirements.txt
```

4. To run the application
```
python3 server.py
```