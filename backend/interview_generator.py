import os
from openai import OpenAI

# Load OpenRouter API key from environment variable
API_KEY = os.getenv("OPENROUTER_API_KEY")

client = OpenAI(
    api_key=API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

MODEL = "deepseek/deepseek-chat-v3-0324"

def generate_interview_questions(role, experience):

    prompt = f"""
Generate 5 interview questions for:

Role: {role}
Experience: {experience}

For each question provide:

Question:
Excellent Answer:
Good Answer:
Poor Answer:

Return in plain text.
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.5,
        max_tokens=1200
    )

    return response.choices[0].message.content