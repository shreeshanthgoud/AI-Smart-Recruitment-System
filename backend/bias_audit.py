# Bias audit module
def audit_candidates(candidates):

    report = []

    genders = {}

    for candidate in candidates:

        gender = candidate.get("gender","Unknown")

        genders[gender] = genders.get(gender,0) + 1

    report.append({
        "gender_distribution": genders
    })

    return report