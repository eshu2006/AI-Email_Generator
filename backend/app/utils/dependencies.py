from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError

from app.config import JWT_SECRET_KEY
from app.database.mongodb import db

security = HTTPBearer()

ALGORITHM = "HS256"

users_collection = db["users"]


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("email")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid Token"
            )

        user = users_collection.find_one(
            {"email": email}
        )

        if not user:
            raise HTTPException(
                status_code=401,
                detail="User Not Found"
            )

        return user

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )