from sqlalchemy import Column, String, Boolean, DateTime
from ..app.database import Base
from datetime import datetime

class EmailVerification(Base):
    __tablename__ = "email_verifications"
    
    email = Column(String, primary_key=True, index=True)
    code = Column(String)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    temp_data = Column(String, nullable=True)  # Храним JSON как строку
