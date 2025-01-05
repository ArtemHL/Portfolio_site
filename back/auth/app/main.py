from fastapi import FastAPI
from .database import engine, Base
from .routes import auth, protected

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include routers
app.include_router(auth.router)
app.include_router(protected.router)