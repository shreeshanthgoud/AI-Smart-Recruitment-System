import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).with_name(".env"))

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from jd_generator import generate_jd
from interview_generator import generate_interview_questions
from database import interview_questions
import uuid

app = FastAPI()

# ==========================
# CORS
# ==========================

CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://localhost:5174,"
        "http://127.0.0.1:5173,http://127.0.0.1:5174",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# IMPORTS
# ==========================

try:
    from .database import candidates
    from .resume_parser import parse_resume
    from .scoring_engine import calculate_score
except ImportError:
    from database import candidates
    from resume_parser import parse_resume
    from scoring_engine import calculate_score

# ==========================
# UPLOAD FOLDER
# ==========================

UPLOAD_DIR = Path(__file__).resolve().parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# ==========================
# HOME
# ==========================

@app.get("/")
def home():
    return {
        "message": "FairHire AI Recruitment System Running"
    }

# ==========================
# UPLOAD RESUME
# ==========================

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected"
        )

    filename = Path(file.filename).name

    if not filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )

    save_path = UPLOAD_DIR / f"{uuid.uuid4().hex}_{filename}"

    try:

        contents = await file.read()

        if not contents:
            raise HTTPException(
                status_code=400,
                detail="Uploaded file is empty"
            )

        with save_path.open("wb") as f:
            f.write(contents)

        # Parse Resume
        parsed_data = parse_resume(str(save_path))
        parsed_data["score"] = calculate_score(parsed_data)

        # Prevent Duplicate Candidates
        email = parsed_data.get("email", "").strip()

        if email:
            existing_candidate = candidates.find_one(
                {"email": email}
            )

            if existing_candidate:
                return {
                    "success": False,
                    "message": "Candidate already exists",
                    "candidate_id": str(existing_candidate["_id"])
                }

        # Save Candidate
        result = candidates.insert_one(parsed_data)

        return {
            "success": True,
            "message": "Resume uploaded successfully",
            "candidate_id": str(result.inserted_id),
            "candidate": parsed_data
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Resume processing failed: {str(exc)}"
        )

# ==========================
# GET ALL CANDIDATES
# ==========================

@app.get("/candidates")
def get_candidates():

    try:

        data = []

        for candidate in candidates.find():

            candidate["_id"] = str(candidate["_id"])

            data.append(candidate)

        return data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# ==========================
# DASHBOARD STATS
# ==========================
@app.post("/generate-interview")
async def generate_interview(data: dict):

    role = data["role"]
    experience = data["experience"]

    questions = generate_interview_questions(
        role,
        experience
    )

    interview_questions.insert_one({
        "role": role,
        "experience": experience,
        "questions": questions
    })

    return {
        "success": True,
        "questions": questions
    }
@app.get("/dashboard-stats")
def dashboard_stats():

    try:

        total = candidates.count_documents({})

        shortlisted = candidates.count_documents(
            {"score": {"$gte": 70}}
        )

        selected = candidates.count_documents(
            {"score": {"$gte": 85}}
        )

        return {
            "total_candidates": total,
            "shortlisted": shortlisted,
            "selected": selected
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# ==========================
# DELETE ALL CANDIDATES
# (Optional - For Testing)
# ==========================


@app.post("/generate-jd")
async def generate_job_description(data: dict):

    jd = generate_jd(
        data["role"],
        data["skills"],
        data["experience"],
        data["location"]
    )

    return {
        "success": True,
        "job_description": jd
    }
@app.delete("/candidates")
def delete_all_candidates():

    result = candidates.delete_many({})

    return {
        "message": f"{result.deleted_count} candidates deleted"
    }