from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi import APIRouter, Depends, HTTPException
from .gencode import generate_verification_code
from sqlalchemy.orm import Session
from .verification import EmailVerification
from ..app.dependencies import get_db
from datetime import datetime

email_router = APIRouter()

# Конфигурация почты
conf = ConnectionConfig(
    MAIL_USERNAME = "shopermna@gmail.com",
    MAIL_PASSWORD = "uhxy bcdg ncsm nwqc ",
    MAIL_FROM = "shopermna@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True
)

@email_router.post("/send-email")
async def send_verification_email(email: str, db: Session = Depends(get_db)):
    try:
        code = generate_verification_code()
        
        # Сохраняем код в базе
        verification = EmailVerification(
            email=email,
            code=code,
            created_at=datetime.utcnow()
        )
        db.add(verification)
        db.commit()
        
        # Отправляем email
        message = MessageSchema(
            subject="Email Verification",
            recipients=[email],
            body=f"Your verification code is: {code}",
            subtype=MessageType.plain
        )
        
        fm = FastMail(conf)
        await fm.send_message(message)
        
        return {"message": "Verification code sent"}
    except Exception as e:
        if 'db' in locals():  # Проверяем, существует ли db
            db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# Отдельная функция для отправки кода при регистрации
async def send_verification_code(email: str, db: Session):
    try:
        code = generate_verification_code()
        
        # Сохраняем код в базе
        verification = EmailVerification(
            email=email,
            code=code,
            created_at=datetime.utcnow()
        )
        db.add(verification)
        db.commit()
        
        # Отправляем email
        message = MessageSchema(
            subject="Email Verification",
            recipients=[email],
            body=f"Your verification code is: {code}",
            subtype=MessageType.plain
        )
        
        fm = FastMail(conf)
        await fm.send_message(message)
        
        return code
    except Exception as e:
        if db:
            db.rollback()
        raise e