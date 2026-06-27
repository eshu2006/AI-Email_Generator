from pydantic import BaseModel


class EmailRequest(BaseModel):
    recipient: str
    purpose: str
    tone: str
    length: str


class EmailResponse(BaseModel):
    subject: str
    body: str