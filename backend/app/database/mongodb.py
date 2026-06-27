from pymongo import MongoClient

from app.config import MONGODB_URI, DATABASE_NAME


client = MongoClient(MONGODB_URI)

db = client[DATABASE_NAME]


def test_connection():

    try:

        client.admin.command("ping")

        return True

    except Exception as e:

        print(e)

        return False