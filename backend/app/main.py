from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth_routes import router as auth_router
from app.routes.database_routes import router as database_router
from app.routes.user_routes import router as user_router
from app.routes.email_routes import router as email_router
from app.routes.history_routes import router as history_router

app = FastAPI(
    title="AI Email Generator API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-email-generator-zeta-eight.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(database_router)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(email_router)
app.include_router(history_router)