from pydantic import BaseModel, field_validator, EmailStr
import re

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
            
        if not re.search(r'\d', v):
            raise ValueError('Password must contain at least one digit')
            
        return v

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        # Дополнительная валидация email если нужна
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str
