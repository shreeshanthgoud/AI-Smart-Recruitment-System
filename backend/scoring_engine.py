def calculate_score(candidate):

    score = 0

    skills = candidate.get("skills", [])

    required_skills = [
        "Python",
        "SQL",
        "AWS",
        "Docker",
        "Machine Learning"
    ]

    for skill in required_skills:
        if skill.lower() in [s.lower() for s in skills]:
            score += 20

    return min(score, 100)