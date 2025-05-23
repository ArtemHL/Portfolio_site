from fastapi import APIRouter, Depends, HTTPException, Response, Body
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..models.user import User
from ..schemas.user import UserCreate, UserLogin
from ..security import security, pwd_context
from ...emailVerfi.email import send_verification_email
from ...emailVerfi.verification import EmailVerification as DBEmailVerification
from datetime import datetime, timedelta
from ...emailVerfi.gencode import generate_verification_code
import json
from pydantic import BaseModel, EmailStr
import time

router = APIRouter()

# Создаем схему для входящих данных верификации


# Создаем Pydantic модель для верификации
class VerificationRequest(BaseModel):
    email: EmailStr
    code: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "code": "123456"
            }
        }

@router.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    max_retries = 3
    retry_delay = 1  # секунда
    
    for attempt in range(max_retries):
        try:
            # Проверяем существующую верификацию
            existing_verification = db.query(DBEmailVerification).filter(
                DBEmailVerification.email == user.email
            ).first()
            
            if existing_verification:
                db.delete(existing_verification)
                db.commit()
            
            verification_code = generate_verification_code()
            
            new_verification = DBEmailVerification(
                email=user.email,
                code=verification_code,
                created_at=datetime.utcnow(),
                temp_data=json.dumps({
                    "username": user.username,
                    "password": pwd_context.hash(user.password)
                })
            )
            
            db.add(new_verification)
            db.commit()
            
            # Отправляем email с кодом
            await send_verification_email(user.email, db)
            
            return {
                "message": "Verification code sent to your email",
                "email": user.email
            }
            
        except Exception as e:
            db.rollback()
            if attempt < max_retries - 1:  # Если это не последняя попытка
                time.sleep(retry_delay)  # Ждем перед следующей попыткой
                continue
            print(f"Registration error: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"An error occurred during registration: {str(e)}"
            )

@router.post("/verify-email")
async def verify_email(verification_data: VerificationRequest, db: Session = Depends(get_db)):
    try:
        verification = db.query(DBEmailVerification).filter(
            DBEmailVerification.email == verification_data.email
        ).first()
        
        if not verification:
            raise HTTPException(
                status_code=404,
                detail="Verification record not found. Please register again."
            )
        
        # Проверяем не истек ли срок действия кода
        if datetime.utcnow() - verification.created_at > timedelta(minutes=10):
            db.delete(verification)
            db.commit()
            raise HTTPException(
                status_code=400,
                detail="Verification code has expired. Please register again."
            )
        
        # Проверяем код
        if verification.code != verification_data.code:
            raise HTTPException(
                status_code=400,
                detail="Invalid verification code"
            )
        
        try:
            # Получаем сохраненные данные
            temp_data = json.loads(verification.temp_data)
            
            # Создаем пользователя
            user = User(
                username=temp_data["username"],
                email=verification.email,
                password=temp_data["password"]
            )
            
            db.add(user)
            # Удаляем запись верификации
            db.delete(verification)
            db.commit()
            
            return {
                "message": "Email verified and registration completed successfully",
                "email": verification_data.email
            }
            
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=500, 
                detail=f"Error creating user account: {str(e)}"
            )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.post("/login")
async def login(creds: UserLogin, response: Response, db: Session = Depends(get_db)):
    # Ищем пользователя
    user = db.query(User).filter(User.email == creds.email).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not pwd_context.verify(creds.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Создаем токен
    token = security.create_access_token(user.email)
    
    # Устанавливаем cookie с токеном
    response.set_cookie(
        "access_token",
        token,
        httponly=True,
        secure=True,
        samesite="Strict",
        max_age=3600
    )
    
    return {"message": "Login successful"}


@router.post("/resend-verification")
async def resend_verification(email: str, db: Session = Depends(get_db)):
    # Проверяем существование пользователя
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    # Удаляем старый код верификации если есть
    old_verification = db.query(DBEmailVerification).filter(
        DBEmailVerification.email == email
    ).first()
    if old_verification:
        db.delete(old_verification)
        db.commit()
    
    # Отправляем новый код
    await send_verification_email(email, db)
    
    return {
        "message": "New verification code sent",
        "email": email
    }


