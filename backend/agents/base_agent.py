from services.groq_client import client
from config import MODEL

class BaseAgent:

    def __init__(self, role, system_prompt):

        self.role = role

        self.system_prompt = system_prompt

    def run(self, message):
        try:
            completion = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": self.system_prompt
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ]
            )
            return completion.choices[0].message.content
        except Exception as e:
            return f"Error: I'm currently unable to connect to my backend AI provider to process your request. ({str(e)})"