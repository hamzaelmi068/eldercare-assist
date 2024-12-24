from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

router = APIRouter()

# Alert Models
class Alert(BaseModel):
    id: str
    type: str
    description: str
    timestamp: datetime
    status: str
    location: Optional[str] = None
    confidence: Optional[float] = None
    resolved_at: Optional[datetime] = None
    resolved_by: Optional[str] = None

class AlertCreate(BaseModel):
    type: str
    description: str
    location: Optional[str] = None
    confidence: Optional[float] = None

# User Models
class User(BaseModel):
    id: str
    username: str
    email: EmailStr
    full_name: str
    role: str  # 'caregiver' or 'family'
    created_at: datetime
    last_login: Optional[datetime] = None

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: str
    role: str