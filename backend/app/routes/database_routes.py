from fastapi import APIRouter

from app.database.mongodb import test_connection

router = APIRouter(
    prefix="/database",
    tags=["Database"]
)


@router.get("/test")
def database_test():

    if test_connection():

        return {
            "success": True,
            "message": "MongoDB Connected Successfully 🚀"
        }

    return {
        "success": False,
        "message": "Connection Failed"
    }