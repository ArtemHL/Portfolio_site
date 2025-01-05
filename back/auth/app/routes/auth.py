from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..models.user import User
from ..schemas.user import UserCreate, UserLogin
from ..security import security, pwd_context
from ..config import settings
from pydantic import ValidationError

router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Проверяем существование пользователя
        if db.query(User).filter(User.username == user.username).first():
            raise HTTPException(
                status_code=400,
                detail="Username already registered"
            )
        
        # Создаем нового пользователя
        hashed_password = pwd_context.hash(user.password)
        db_user = User(username=user.username, password=hashed_password)
        
        db.add(db_user)
        db.commit()
        
        return {
            "message": "User created successfully",
            "username": user.username
        }
        
    except ValidationError as e:
        raise HTTPException(
            status_code=422,
            detail=str(e)
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="An error occurred while registering the user"
        )

@router.post("/login")
def login(creds: UserLogin, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == creds.username).first()
    if not user or not pwd_context.verify(creds.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = security.create_access_token(creds.username)
    response.set_cookie(
        settings.auth_config.JWT_ACCESS_COOKIE_NAME,
        token,
        httponly=True,
        secure=True,
        samesite="Strict",
        max_age=settings.auth_config.JWT_ACCESS_TOKEN_EXPIRES
    )
    return {"message": "Login successful"}
