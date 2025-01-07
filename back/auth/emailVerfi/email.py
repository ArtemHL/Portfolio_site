from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..app.dependencies import get_db
from .verification import EmailVerification
from .gencode import generate_verification_code
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# Создаем роутер
router = APIRouter()

async def send_verification_email(email: str, db: Session):
    # Получаем код верификации
    verification = db.query(EmailVerification).filter(
        EmailVerification.email == email
    ).first()
    
    if not verification:
        return False
    
    # Настройки SMTP
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "shopermna@gmail.com"  # Замените на ваш email
    password = "bron uwld nyns nqtm "  # Замените на ваш пароль приложения
    
    # Создаем сообщение
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = email
    message["Subject"] = "Email Verification Code"
    
    body = f"Your verification code is: {verification.code}"
    message.attach(MIMEText(body, "plain"))
    
    try:
        # Подключаемся к SMTP серверу
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, password)
        
        # Отправляем email
        server.send_message(message)
        server.quit()
        return True
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

# Добавляем роут для повторной отправки кода
@router.post("/resend-code")
async def resend_verification_code(email: str, db: Session = Depends(get_db)):
    verification = db.query(EmailVerification).filter(
        EmailVerification.email == email
    ).first()
    
    if not verification:
        return {"success": False, "message": "Email not found"}
    
    # Генерируем новый код
    new_code = generate_verification_code()
    verification.code = new_code
    verification.created_at = datetime.utcnow()
    
    try:
        db.commit()
        # Отправляем новый код
        if await send_verification_email(email, db):
            return {"success": True, "message": "New verification code sent"}
        else:
            return {"success": False, "message": "Failed to send verification code"}
    except Exception as e:
        db.rollback()
        return {"success": False, "message": str(e)}