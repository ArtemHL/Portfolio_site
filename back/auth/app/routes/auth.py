from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..models.user import User
from ..schemas.user import UserCreate, UserLogin
from ..security import security, pwd_context
from ..config import settings
from pydantic import ValidationError
from ...emailVerfi.email import conf
from fastapi_mail import FastMail, MessageSchema, MessageType
from ...emailVerfi.gencode import generate_verification_code
from ...emailVerfi.email import send_verification_email
from ...emailVerfi.verification import EmailVerification

router = APIRouter()

@router.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        if db.query(User).filter(User.email == user.email).first():
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = pwd_context.hash(user.password)
        db_user = User(
            username=user.username,
            email=user.email,
            password=hashed_password,
            is_verified=False
        )
        
        db.add(db_user)
        db.commit()
        
        # Отправляем код верификации
        await send_verification_code(user.email, db)
        
        return {
            "message": "Registration successful. Please verify your email.",
            "redirect": "/verify-email",
            "email": user.email
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
async def login(creds: UserLogin, response: Response, db: Session = Depends(get_db)):
    # Ищем пользователя по email вместо username
    user = db.query(User).filter(User.email == creds.email).first()
    if not user or not pwd_context.verify(creds.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Создаем токен на основе email вместо username
    token = security.create_access_token(user.email)
    response.set_cookie(
        settings.auth_config.JWT_ACCESS_COOKIE_NAME,
        token,
        httponly=True,
        secure=True,
        samesite="Strict",
        max_age=settings.auth_config.JWT_ACCESS_TOKEN_EXPIRES
    )
    return {"message": "Login successful"}


# @router.post("/send-email")
# async def send_email(email: str):
#     try:
#         code = generate_verification_code()
#         email = User.email
#         message = MessageSchema(
#             subject="Verification Code",
#             recipients=[email],
#             body=f"Your verification code is: {code}",
#             subtype=MessageType.plain
#         )
#         # Создаем экземпляр FastMail
#         fm = FastMail(conf)
#         # Отправляем email
#         await fm.send_message(message)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# @router.post("/verify-email")
# async def verify_email(email: str, code: str, db: Session = Depends(get_db)):
#     verification = db.query(EmailVerification).filter(
#         EmailVerification.email == email
#     ).first()
    
#     if not verification:
#         raise HTTPException(status_code=404, detail="Verification not found")
    
#     if verification.code != code:
#         raise HTTPException(status_code=400, detail="Invalid verification code")
    
#     # Обновляем статус верификации пользователя
#     user = db.query(User).filter(User.email == email).first()
#     user.is_verified = True
#     verification.is_verified = True
    
#     db.commit()
    
#     return {"message": "Email verified successfully"}


