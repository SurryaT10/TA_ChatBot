from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv() # take environment variables from .env.

class ChatBot:
    def __init__(self) -> None:
        self.API_KEY = os.getenv("OPENAI_KEY")
        self.client = OpenAI(api_key=self.API_KEY)
    def chat(self, query):
        message = self.client.chat.completions.create(
            model='gpt-3.5-turbo',
            messages=[
                {"role": "system", "content": os.getenv("SYSTEM_PROMPT")},
                {"role": "user", "content": query}
            ],
            max_tokens=50,
            temperature=0.3,
        )
        
        return message