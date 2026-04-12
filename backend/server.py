from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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


# Routes
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

@api_router.get("/volunteers", response_model=List[VolunteerResponse])
async def get_volunteers():
    volunteers = await db.volunteers.find({}, {"_id": 0}).to_list(1000)
    return volunteers

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

@api_router.get("/contact", response_model=List[ContactResponse])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
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
