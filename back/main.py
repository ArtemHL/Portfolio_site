from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.app.database import engine, Base
from auth.app.routes import auth, protected

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # сюда ссылка на фронт с портом
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(protected.router)