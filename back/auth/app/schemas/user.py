from pydantic import BaseModel, validator
import re

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
            
        # Дополнительные проверки (опционально)
        if not re.search(r'\d', v):
            raise ValueError('Password must contain at least one digit')
            
            
        return v

class UserLogin(UserBase):
    password: str
