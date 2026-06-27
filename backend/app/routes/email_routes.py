from fastapi import APIRouter, Depends

from app.schemas.email_schema import EmailRequest, EmailResponse
from app.services.ai_service import generate_email
from app.utils.dependencies import get_current_user

router = APIRouter(
    prefix="/email",
    tags=["Email"]
)


@router.post("/generate", response_model=EmailResponse)
def generate(
    request: EmailRequest,
    current_user=Depends(get_current_user)
):

    email = generate_email(request, current_user)

    return EmailResponse(
        subject=email["subject"],
        body=email["body"]
    )