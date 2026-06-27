from fastapi import APIRouter, Depends

from app.utils.dependencies import get_current_user

router = APIRouter(
    prefix="/user",
    tags=["User"]
)


@router.get("/profile")
def profile(current_user=Depends(get_current_user)):

    return {

        "name": current_user["name"],

        "email": current_user["email"]

    }