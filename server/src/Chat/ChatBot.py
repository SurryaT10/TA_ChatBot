from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv() # take environment variables from .env.

class ChatBot:
    
    def __init__(self) -> None:
        self.API_KEY = os.getenv("OPENAI_KEY")
        self.client = OpenAI(api_key=self.API_KEY)
    def chat(self, query):
        prompt = os.getenv("SYSTEM_PROMPT")
        
        message = self.client.chat.completions.create(
            model=os.getenv("FINE_TUNED_MODEL_ID"),
            messages=[
                { "role": "system", "content": prompt },
                { "role": "user", "content": query },
            ],
            max_tokens=int(os.getenv("MAX_TOKENS")),
            temperature=float(os.getenv("GPT_TEMPERATURE"))
        )
        
        print(message)
        
        return message