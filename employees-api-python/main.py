from fastapi import FastAPI
from src.employees.router import router as employees_router
from src.offices.router import router as offices_router
from src.tags.router import router as tags_router
from starlette.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

mongodb_uri = os.getenv("MONGODB_URI")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type"],
)

app.include_router(employees_router, prefix="/employees")
app.include_router(offices_router, prefix="/offices")
app.include_router(tags_router, prefix="/tags")
