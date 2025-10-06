import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from functools import lru_cache
from langchain_openai import ChatOpenAI
from api.src.prompt import system_prompt
from fastapi.middleware.cors import CORSMiddleware
from langchain_pinecone import PineconeVectorStore
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from api.src.helper import download_hugging_face_embeddings
from langchain.chains.combine_documents import create_stuff_documents_chain

app = FastAPI()

# define cors
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str

load_dotenv()

PINECONE_API_KEY=os.environ.get('PINECONE_API_KEY')
OPENAI_API_KEY=os.environ.get('OPENAI_API_KEY')

os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

@lru_cache(maxsize=1)
def get_rag_chain():
    embeddings = download_hugging_face_embeddings()
    index_name = "medical-chatbot"

    # Embed each chunk and upsert the embeddings into your Pinecone index.
    docsearch = PineconeVectorStore.from_existing_index(
        index_name=index_name,
        embedding=embeddings
    )
    retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 3})

    # chatModel = ChatOpenAI(model="gpt-4o")
    chatModel = ChatOpenAI(
        base_url="https://openrouter.ai/api/v1",
        model="openai/gpt-oss-20b:free"
    )
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}")
    ])
    question_answer_chain = create_stuff_documents_chain(chatModel, prompt)
    return create_retrieval_chain(retriever, question_answer_chain)

@app.get("/")
async def root():
    return {"message": "FastAPI + Hugging Face Spaces ✅"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    rag_chain = get_rag_chain()
    response = rag_chain.invoke({"input": request.query})
    print("Response : ", response["answer"])
    return {"message": str(response["answer"])}