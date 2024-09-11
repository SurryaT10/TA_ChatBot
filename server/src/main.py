from fastapi import FastAPI
from pydantic import BaseModel
from Chat.ChatBot import ChatBot

app = FastAPI()

class ChatRequest(BaseModel):
    query: str

@app.get("/chat")
async def chat(request: ChatRequest):
    chatbot = ChatBot()
    message = chatbot.chat(request.query)

    return { "message": message.choices[0].message.content }