from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ReturnDocument
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

class EndorsementCreate(BaseModel):
    name: str
    title: Optional[str] = None
    quote: str
    name_fr: Optional[str] = None
    title_fr: Optional[str] = None
    quote_fr: Optional[str] = None

class EndorsementResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: Optional[str] = None
    quote: str
    name_fr: Optional[str] = None
    title_fr: Optional[str] = None
    quote_fr: Optional[str] = None
    created_at: str = ""

class SettingsUpdate(BaseModel):
    show_endorsements: Optional[bool] = None


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

@api_router.get("/endorsements", response_model=List[EndorsementResponse])
async def get_endorsements():
    endorsements = await db.endorsements.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return endorsements

@api_router.get("/settings")
async def get_settings():
    settings = await db.settings.find_one({"id": "site_settings"}, {"_id": 0})
    if not settings:
        return {"show_endorsements": False}
    return settings


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

@api_router.get("/admin/endorsements", response_model=List[EndorsementResponse])
async def admin_get_endorsements(request: Request):
    await get_admin(request)
    endorsements = await db.endorsements.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return endorsements

@api_router.post("/admin/endorsements", response_model=EndorsementResponse)
async def admin_create_endorsement(request: Request, input: EndorsementCreate):
    await get_admin(request)
    endorsement = EndorsementResponse(
        name=input.name,
        title=input.title,
        quote=input.quote,
        name_fr=input.name_fr,
        title_fr=input.title_fr,
        quote_fr=input.quote_fr,
        created_at=datetime.now(timezone.utc).isoformat()
    )
    doc = endorsement.model_dump()
    await db.endorsements.insert_one(doc)
    return endorsement

@api_router.put("/admin/endorsements/{endorsement_id}", response_model=EndorsementResponse)
async def admin_update_endorsement(request: Request, endorsement_id: str, input: EndorsementCreate):
    await get_admin(request)
    update_data = input.model_dump()
    result = await db.endorsements.find_one_and_update(
        {"id": endorsement_id},
        {"$set": update_data},
        return_document=ReturnDocument.AFTER,
        projection={"_id": 0}
    )
    if not result:
        raise HTTPException(status_code=404, detail="Endorsement not found")
    return result

@api_router.delete("/admin/endorsements/{endorsement_id}")
async def admin_delete_endorsement(request: Request, endorsement_id: str):
    await get_admin(request)
    result = await db.endorsements.delete_one({"id": endorsement_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Endorsement not found")
    return {"status": "deleted"}

@api_router.get("/admin/settings")
async def admin_get_settings(request: Request):
    await get_admin(request)
    settings = await db.settings.find_one({"id": "site_settings"}, {"_id": 0})
    if not settings:
        return {"show_endorsements": False}
    return settings

@api_router.put("/admin/settings")
async def admin_update_settings(request: Request, input: SettingsUpdate):
    await get_admin(request)
    update = {}
    if input.show_endorsements is not None:
        update["show_endorsements"] = input.show_endorsements
    await db.settings.update_one(
        {"id": "site_settings"},
        {"$set": {**update, "id": "site_settings"}},
        upsert=True
    )
    settings = await db.settings.find_one({"id": "site_settings"}, {"_id": 0})
    return settings


# Seed placeholder endorsements on startup
@app.on_event("startup")
async def seed_endorsements():
    count = await db.endorsements.count_documents({})
    if count == 0:
        placeholders = [
            {
                "id": str(uuid.uuid4()),
                "name": "Community Member",
                "title": "Miramichi Resident",
                "quote": "Shawn is the kind of leader Miramichi needs — someone who actually lives the issues we all face every day. He's not in it for politics, he's in it for us.",
                "name_fr": "Membre de la communaut\u00e9",
                "title_fr": "R\u00e9sident de Miramichi",
                "quote_fr": "Shawn est le genre de leader dont Miramichi a besoin \u2014 quelqu'un qui vit vraiment les probl\u00e8mes qu'on fait face \u00e0 tous les jours. Il est point l\u00e0-dedans pour la politique, il est l\u00e0 pour nous autres.",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Local Business Owner",
                "title": "Small Business, Miramichi",
                "quote": "Finally, someone who understands that growing the tax base — not raising taxes — is how you build a city. Shawn has my vote.",
                "name_fr": "Propri\u00e9taire d'entreprise locale",
                "title_fr": "Petite entreprise, Miramichi",
                "quote_fr": "Finalement, quelqu'un qui comprend que faire cro\u00eetre la base fiscale \u2014 pas augmenter les taxes \u2014 c'est comme \u00e7a qu'on b\u00e2tit une ville. Shawn a mon vote.",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Veteran Supporter",
                "title": "Proud Canadian Veteran",
                "quote": "Shawn's commitment to protecting our veterans' memorials means the world to me and my family. It's about respect — and he gets it.",
                "name_fr": "Supporteur v\u00e9t\u00e9ran",
                "title_fr": "Fier v\u00e9t\u00e9ran canadien",
                "quote_fr": "L'engagement de Shawn \u00e0 prot\u00e9ger les m\u00e9moriaux de nos v\u00e9t\u00e9rans, \u00e7a veut dire le monde pour moi et ma famille. C'est une question de respect \u2014 et il comprend \u00e7a.",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.endorsements.insert_many(placeholders)


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
