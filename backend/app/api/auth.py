from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import databutton as db
from typing import Optional
import jwt
from datetime import datetime, timedelta

router = APIRouter()

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    username: str
    token: str

class TokenData(BaseModel):
    username: str
    exp: datetime

def create_token(username: str) -> str:
    """Create a JWT token for the user"""
    expiration = datetime.utcnow() + timedelta(hours=24)
    token_data = TokenData(username=username, exp=expiration)
    
    # In production, use a proper secret key stored in db.secrets
    return jwt.encode(token_data.dict(), "temp_secret", algorithm="HS256")

@router.post("/login")
def login(user: UserLogin) -> UserResponse:
    """Login endpoint that validates credentials and returns a token"""
    # Mock authentication - replace with proper auth in production
    if user.username == "demo" and user.password == "demo123":
        token = create_token(user.username)
        return UserResponse(username=user.username, token=token)
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/verify-token")
def verify_token(token: str) -> bool:
    """Verify a JWT token"""
    try:
        jwt.decode(token, "temp_secret", algorithms=["HS256"])
        return True
    except:
        return False