from app.database.mongodb import db
from app.utils.password import hash_password
from app.utils.password import verify_password
from app.utils.jwt_handler import create_access_token

users_collection = db["users"]


def create_user(user):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:

        return {
            "success": False,
            "message": "Email already exists"
        }

    new_user = {

        "name": user.name,

        "email": user.email,

        "password": hash_password(user.password)

    }

    users_collection.insert_one(new_user)

    return {

        "success": True,

        "message": "User created successfully"

    }
    
def login_user(user):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if not existing_user:

        return {
            "success": False,
            "message": "Invalid Email"
        }

    if not verify_password(
        user.password,
        existing_user["password"]
    ):

        return {
            "success": False,
            "message": "Invalid Password"
        }

    token = create_access_token(
        {
            "email": existing_user["email"]
        }
    )

    return {

        "success": True,

        "access_token": token,

        "user":{

            "name":existing_user["name"],

            "email":existing_user["email"]

        }

    }