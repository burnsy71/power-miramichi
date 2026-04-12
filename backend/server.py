from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = "HS256"
ADMIN_PASSWORD = os.environ['ADMIN_PASSWORD']

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Models
class VolunteerCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: Optional[str] = None

class VolunteerResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: Optional[str] = None
    created_at: str = ""

class ContactCreate(BaseModel):
    name: str
    email: str
    message: str

class ContactResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: str = ""

class AdminLogin(BaseModel):
    password: str


# Auth helpers
def create_access_token(data: dict) -> str:
    payload = {
        **data,
        "exp": datetime.now(timezone.utc) + timedelta(hours=8),
        "type": "access"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_admin(request: Request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth[7:]
    payload = verify_token(token)
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    return payload


# Public routes
@api_router.get("/")
async def root():
    return {"message": "Shawn Power for Mayor - API"}

@api_router.post("/volunteers", response_model=VolunteerResponse)
async def create_volunteer(input: VolunteerCreate):
    volunteer = VolunteerResponse(
        name=input.name,
        email=input.email,
        phone=input.phone,
        message=input.message,
        created_at=datetime.now(timezone.utc).isoformat()
    )
    doc = volunteer.model_dump()
    await db.volunteers.insert_one(doc)
    return volunteer

@api_router.post("/contact", response_model=ContactResponse)
async def create_contact(input: ContactCreate):
    contact = ContactResponse(
        name=input.name,
        email=input.email,
        message=input.message,
        created_at=datetime.now(timezone.utc).isoformat()
    )
    doc = contact.model_dump()
    await db.contact_messages.insert_one(doc)
    return contact


# Admin routes
@api_router.post("/admin/login")
async def admin_login(input: AdminLogin):
    if input.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")
    token = create_access_token({"role": "admin", "sub": "admin"})
    return {"token": token, "role": "admin"}

@api_router.get("/admin/me")
async def admin_me(request: Request):
    payload = await get_admin(request)
    return {"role": payload["role"]}

@api_router.get("/admin/volunteers", response_model=List[VolunteerResponse])
async def admin_get_volunteers(request: Request):
    await get_admin(request)
    volunteers = await db.volunteers.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return volunteers

@api_router.get("/admin/contacts", response_model=List[ContactResponse])
async def admin_get_contacts(request: Request):
    await get_admin(request)
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return messages


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
