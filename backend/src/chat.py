import os
from openai import OpenAI
from dotenv import load_dotenv
class Chat :

    load_dotenv()
    api_key = os.getenv("DEEPSEEK_API")
    base_url = "https://api.deepseek.com"
    client = OpenAI(api_key = api_key, base_url = base_url)

    def __init__(self):
        
        self.messages = []


    def send_message(self, message)->str:
         self.messages.append({"role": "user", "content": message})
         
         response = Chat.client.chat.completions.create(
            model="deepseek-chat",
            messages=self.messages,
            stream=False
        )
         
         assistant_report = response.choices[0].message.content
         self.messages.append({"role": "assistant", "content": assistant_report})
         return assistant_report
         
         
    