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

async def send_verification_email(email: str, db: Session):
    """Отправляет email с кодом верификации"""
    try:
        # Получаем существующую запись верификации
        verification = db.query(EmailVerification).filter(
            EmailVerification.email == email
        ).first()
        
        if not verification:
            raise HTTPException(status_code=404, detail="Verification record not found")
        
        # Отправляем email с существующим кодом
        message = MessageSchema(
            subject="Email Verification",
            recipients=[email],
            body=f"Your verification code is: {verification.code}",
            subtype=MessageType.plain
        )
        
        fm = FastMail(conf)
        await fm.send_message(message)
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error sending verification email: {str(e)}"
        )

@email_router.post("/send-email")
async def resend_verification(email: str, db: Session = Depends(get_db)):
    """Эндпоинт для повторной отправки кода"""
    try:
        verification = db.query(EmailVerification).filter(
            EmailVerification.email == email
        ).first()
        
        if not verification:
            raise HTTPException(
                status_code=404,
                detail="No verification record found"
            )
        
        # Обновляем код и время создания
        verification.code = generate_verification_code()
        verification.created_at = datetime.utcnow()
        db.commit()
        
        # Отправляем новый код
        await send_verification_email(email, db)
        
        return {"message": "New verification code sent"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error resending verification code: {str(e)}"
        )