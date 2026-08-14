import os
from openai import OpenAI

# Load OpenRouter API key from environment variable
API_KEY = os.getenv("OPENROUTER_API_KEY")

client = OpenAI(
    api_key=API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

MODEL = "deepseek/deepseek-chat-v3-0324"

def generate_jd(role, skills, experience, location):

    prompt = f"""
Generate a professional job description.

Role: {role}
Required Skills: {skills}
Experience Required: {experience}
Location: {location}

Include:
1. Job Summary
2. Responsibilities
3. Required Skills
4. Qualifications
5. Benefits

Return only the job description.
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=1000
    )

    return response.choices[0].message.content