# Medical Chatbot with LLMs, LangChain, Pinecone, React & AWS

## Project Description

This project is a Medical Chatbot application that leverages Large Language Models (LLMs), LangChain, Pinecone, and AWS to provide intelligent, context-aware medical assistance. The backend is built with Python, integrating advanced NLP and vector search capabilities, while the frontend is developed using React for a responsive and interactive user experience. The system enables users to interact with the chatbot, retrieve relevant medical information, and store/query data efficiently.

## Features

- Conversational AI for medical queries
- Retrieval-Augmented Generation (RAG) using vector database
- Context-aware responses powered by LLMs
- Scalable backend with FastAPI
- Responsive frontend with React
- Cloud deployment with Hugging Face Spaces

## Tools & Technologies Used

- Python (FastAPI, LangChain)
- Pinecone (Vector Database)
- OpenAI API (LLMs)
- Hugging Face Space (Deployment, Storage)
- React (Frontend)
- TypeScript & JavaScript
- npm & pip (Package Management)
- Git (Version Control)
- PyCharm (IDE)

## Directory Structure

- `api/` - Python backend (FastAPI, LangChain, Pinecone integration)
- `app/` - React frontend (TypeScript, UI)
- `data/` - Data files
- `src/` - Backend source code

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js & npm
- pip

### Backend Setup

1. Navigate to `api/`:
   ```sh
   cd api
   ```
2. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```
3. Run FastAPI server
    ```sh
   uvicorn main:app --reload
    ```

### Frontend Setup

1. Navigate to `app/`:
   ```sh
   cd app
   ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Run React app:
    ```sh
   npm run dev
    ```

### Usage
- Update your credentials in .env file.
- Access the frontend at http://localhost:3000
Interact with the chatbot for medical queries

### License
This project is licensed under the MIT License.

### Author
Pankaj Kumar