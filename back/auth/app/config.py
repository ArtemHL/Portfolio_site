from authx import AuthXConfig
import os

class Settings:
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "SECRET_KEY")
    
    @property
    def auth_config(self) -> AuthXConfig:
        config = AuthXConfig()
        config.JWT_SECRET_KEY = self.JWT_SECRET_KEY
        config.JWT_ACCESS_COOKIE_NAME = "access_token"
        config.JWT_TOKEN_LOCATION = ["cookies"]
        return config

settings = Settings()
