from passlib.context import CryptContext
from authx import AuthX
from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = AuthX(config=settings.auth_config)
