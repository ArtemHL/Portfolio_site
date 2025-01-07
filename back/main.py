from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.app.routes.auth import router as auth_router
from auth.emailVerfi import email_router
from auth.app.database import engine, Base

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создаем таблицы
Base.metadata.create_all(bind=engine)

# Подключаем роуты
app.include_router(auth_router, tags=["auth"])
app.include_router(email_router, tags=["email"])

# Корневой роут для проверки
@app.get("/")
async def root():
    return {"message": "API is running"}
