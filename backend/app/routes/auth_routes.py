from fastapi import APIRouter
from app.schemas.user_schema import UserSignup
from app.services.auth_service import create_user
from app.schemas.user_schema import UserLogin
from app.services.auth_service import login_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/signup")
def signup(user: UserSignup):

    return create_user(user)

@router.post("/login")
def login(user: UserLogin):

    return login_user(user)