# Data models module
from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    email = Column(String)
    role = Column(String)

    skills = Column(JSON)
    education = Column(JSON)
    experience = Column(JSON)

    score = Column(Integer)