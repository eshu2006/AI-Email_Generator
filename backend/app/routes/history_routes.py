from fastapi import APIRouter, Depends

from app.database.mongodb import db

from app.utils.dependencies import get_current_user

router = APIRouter(
    prefix="/history",
    tags=["History"]
)

emails_collection = db["emails"]


@router.get("/")
def get_history(
    current_user=Depends(get_current_user)
):

    emails = list(
        emails_collection.find(
            {
                "user_id": str(current_user["_id"])
            },
            {
                "_id": 0
            }
        )
    )

    return emails