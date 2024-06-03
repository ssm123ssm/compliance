from langchain_community.document_loaders import PyPDFLoader
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from flask import Flask, jsonify, request, json
from flask_cors import CORS
import anthropic

# Load environment variables
load_dotenv()

# Constants
CHUNK_SIZE = 1000
CHUNKS_OVERLAP = 200
TOP_K = 5
MODEL_NAME = "gpt-3.5-turbo"
EMBEDDING_MODEL = "text-embedding-3-large"

# Load and process the PDF document
loader = PyPDFLoader("data/act_cb.pdf")
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNKS_OVERLAP)
documents = text_splitter.split_documents(docs)
vector = FAISS.from_documents(docs, OpenAIEmbeddings(model=EMBEDDING_MODEL))
retriever = vector.as_retriever(search_kwargs={"k": TOP_K})

def get_related_docs(query):
    related_docs = retriever.get_relevant_documents(query)
    return related_docs

def get_page_content(related_docs):
    page_content = ""
    for i, doc in enumerate(related_docs):
        page_content += f"START OF CONTEXT PART {i+1}\n\n{doc.page_content}\n\nEND OF CONTEXT PART {i+1}\n\n"
    return page_content

def create_query(query):
    related_docs = get_related_docs(query)
    page_content = get_page_content(related_docs)
    final_query = f"""
    You are an expert banker with expert knowledge on compliance and regulations. This question is asked from you.

    <question>
     {query}
    </question>

    You are given relevant sections from the legal document as context. You need to provide the answer to the question based on the given context only.

    <context>
    {page_content}
    </context>

    Give your answer only based on the context given above. Do not give preambles and only give the answer citing relevant sections. If you can't find the answer in the given context, say "I can't find the answer in the given context".
    """
    return final_query

def ask_claud(query):
    response = anthropic.Anthropic().messages.create(
        model="claude-3-opus-20240229",
        max_tokens=512,
        temperature=0,
        messages=[
            {"role": "user", "content": create_query(query)}
        ]
    )
    return response.content[0].text

# Flask app setup
app = Flask(__name__)
CORS(app)

@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({'status': 'ok'}), 200

@app.route('/chat', methods=['POST'])
def chat():
    data = json.loads(request.data)
    message = data['messages'][-1]['content']
    print(message)
    response = ask_claud(message)
    return jsonify({'status': 'ok', 'response': response}), 200

if __name__ == '__main__':
    app.run(port=3002)