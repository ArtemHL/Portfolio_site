from sqlalchemy import Column, String, Boolean
from ..database import Base

class User(Base):
    __tablename__ = "users"
    
    username = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
