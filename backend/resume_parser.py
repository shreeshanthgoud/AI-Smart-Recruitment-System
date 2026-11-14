# resume_parser.py

import json
import os
import re

import fitz
from openai import OpenAI

# =========================
# OPENROUTER CONFIG
# =========================

API_KEY = os.getenv("OPENROUTER_API_KEY")
if not API_KEY:
    raise ValueError("Missing OPENROUTER_API_KEY environment variable")

client = OpenAI(
    api_key=API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

MODEL = "deepseek/deepseek-chat-v3-0324"

# =========================
# PDF TEXT EXTRACTION
# =========================

def extract_text(pdf_path):

    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"Resume file not found: {pdf_path}")

    with fitz.open(pdf_path) as pdf:
        text = ""

        for page in pdf:
            text += page.get_text()

    return text


# =========================
# HELPER FUNCTIONS
# =========================

def _extract_section_lines(text, headings):

    lines = text.splitlines()

    results = []

    capture = False

    stop_sections = [
        "education",
        "experience",
        "projects",
        "certifications",
        "achievements",
        "internship",
        "work experience",
        "professional experience"
    ]

    for raw_line in lines:

        line = raw_line.strip()

        if not line:
            continue

        lowered = line.lower()

        if any(
            lowered == heading or
            lowered.startswith(heading + ":")
            for heading in headings
        ):
            capture = True
            continue

        if capture and lowered in stop_sections:
            break

        if capture:
            results.append(line)

    return results


def parse_resume_with_rules(resume_text):

    lines = [
        line.strip()
        for line in resume_text.splitlines()
        if line.strip()
    ]

    # NAME
    name = "Unknown"

    for line in lines[:10]:

        if (
            len(line.split()) >= 2
            and not re.search(r"@|\d{10}", line)
        ):
            name = line
            break

    # EMAIL

    email_match = re.search(
        r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}",
        resume_text,
        re.I
    )

    # PHONE

    phone_match = re.search(
        r"(?:\+?\d[\d\s().-]{8,}\d)",
        resume_text
    )

    # SKILLS

    skills_lines = _extract_section_lines(
        resume_text,
        ["skills", "technical skills", "core skills"]
    )

    skills = []

    for line in skills_lines:

        parts = re.split(r"[,;/•]+", line)

        for item in parts:

            item = item.strip()

            if (
                item
                and len(item) > 2
                and item.lower() not in
                ["skills", "technical skills"]
            ):
                skills.append(item)

    skills = list(dict.fromkeys(skills))

    # EDUCATION

    education = _extract_section_lines(
        resume_text,
        ["education"]
    )

    # EXPERIENCE

    experience = _extract_section_lines(
        resume_text,
        [
            "experience",
            "work experience",
            "professional experience"
        ]
    )

    return {
        "name": name,
        "email": email_match.group(0) if email_match else "",
        "phone": phone_match.group(0) if phone_match else "",
        "role": "",
        "skills": skills,
        "education": education,
        "experience": experience,
    }


# =========================
# MAIN PARSER
# =========================

def parse_resume(pdf_path):

    resume_text = extract_text(pdf_path)

    short_resume = resume_text[:6000]

    prompt = f"""
Return ONLY valid JSON.

Schema:

{{
  "name":"",
  "email":"",
  "phone":"",
  "role":"",
  "skills":[],
  "education":[],
  "experience":[]
}}

Resume:

{short_resume}
"""

    try:

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0,
            max_tokens=800
        )

        content = response.choices[0].message.content

        content = (
            content
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(content)

    except Exception as e:

        print("AI Parsing Failed:")
        print(str(e))

        result = parse_resume_with_rules(resume_text)

        result["error"] = str(e)

        return result