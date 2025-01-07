from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.app.database import engine, Base
from auth.app.routes import auth, protected
from auth.emailVerfi.email import email_router

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Роуты аутентификации
app.include_router(
    auth.router,
    tags=["authentication"]
)

# Защищенные роуты
app.include_router(
    protected.router,
    tags=["protected"]
)

# Роуты для email верификации
app.include_router(
    email_router,
    tags=["email"]
)

# Корневой роут для проверки API
@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Auth System"}
