from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from .config import MONGODB_URI

load_dotenv()

db = AsyncIOMotorClient(MONGODB_URI).get_default_database()
