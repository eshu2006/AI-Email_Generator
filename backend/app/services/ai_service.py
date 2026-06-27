import json
from datetime import datetime

from google import genai

from app.config import GEMINI_API_KEY
from app.database.mongodb import db

client = genai.Client(api_key=GEMINI_API_KEY)

emails_collection = db["emails"]


def generate_email(request, current_user):

    prompt = f"""
You are a professional email writing assistant.

Write an email using the following details.

Recipient: {request.recipient}

Purpose: {request.purpose}

Tone: {request.tone}

Length: {request.length}

The email should end exactly like this:

Regards,
{current_user["name"]}

Return ONLY valid JSON.

Example:

{{
    "subject": "Meeting Request",
    "body": "Dear Manager,\\n\\nI hope you are doing well...\\n\\nRegards,\\n{current_user["name"]}"
}}

Rules:

1. Return ONLY JSON.
2. Do not use markdown.
3. Do not wrap JSON inside ```json.
4. The JSON must contain only:
   - subject
   - body
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    data = json.loads(text)

    # Save generated email into MongoDB
    emails_collection.insert_one(
        {
            "user_id": str(current_user["_id"]),
            "user_name": current_user["name"],
            "user_email": current_user["email"],
            "recipient": request.recipient,
            "purpose": request.purpose,
            "tone": request.tone,
            "length": request.length,
            "subject": data["subject"],
            "body": data["body"],
            "created_at": datetime.utcnow()
        }
    )

    return data