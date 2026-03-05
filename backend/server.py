from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel, Field, ConfigDict
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
import os
from dotenv import load_dotenv
import secrets
from datetime import datetime, timezone
import uuid
import logging

load_dotenv()

app = FastAPI(title="Drools Pet Store API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGODB_URI)
db = client[os.getenv("DATABASE_NAME", "drools_pet_store")]

# Security
security = HTTPBasic()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    category: str
    image_url: str
    stock: int
    featured: bool = False
    in_stock: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: str
    stock: int
    featured: bool = False
    in_stock: bool = True

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None
    featured: Optional[bool] = None
    in_stock: Optional[bool] = None

class Category(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    name: str
    label: str
    icon: str
    image_url: Optional[str] = None

class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_name: str
    rating: int
    comment: str
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    approved: bool = False

class ReviewCreate(BaseModel):
    customer_name: str
    rating: int
    comment: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    phone: str
    message: str

class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    image_url: str
    caption: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AdminLogin(BaseModel):
    username: str
    password: str

# Admin authentication
async def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "admin")
    correct_password = secrets.compare_digest(credentials.password, "drools2024")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# API Endpoints

@app.get("/api")
async def root():
    return {"message": "Drools Pet Store API", "version": "1.0.0"}

@app.get("/")
async def home():
    return {"message": "Drools Pet Store API is running", "docs": "/docs"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


# Seed initial data on startup
@app.on_event("startup")
async def seed_data():
    try:
        # Check if data already exists
        product_count = await db.products.count_documents({})
        if product_count > 0:
            logger.info("Data already seeded")
            return
        
        # Seed categories with high-quality HD images
        categories = [
            {
                "name": "dog",
                "label": "Dogs",
                "icon": "Dog",
                "image_url": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&q=90&fit=crop"
            },
            {
                "name": "cat",
                "label": "Cats",
                "icon": "Cat",
                "image_url": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1920&q=90&fit=crop"
            },
            {
                "name": "bird",
                "label": "Birds",
                "icon": "Bird",
                "image_url": "https://images.unsplash.com/photo-1444464666168-aa57e8e82e7c?w=1920&q=90&fit=crop"
            },
            {
                "name": "fish",
                "label": "Fish",
                "icon": "Fish",
                "image_url": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=1920&q=90&fit=crop"
            }
        ]
        await db.categories.insert_many(categories)
        
        # Seed products with high-quality HD images
        products = [
            {
                "id": str(uuid.uuid4()),
                "name": "Drools Premium Dog Food",
                "category": "dog",
                "price": 1299,
                "description": "High-quality nutrition for adult dogs with real chicken and vegetables",
                "image_url": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=85&fit=crop",
                "stock": 50,
                "featured": True,
                "in_stock": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Pedigree Adult Dry Dog Food",
                "category": "dog",
                "price": 899,
                "description": "Complete nutrition with chicken and vegetables for adult dogs",
                "image_url": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=85&fit=crop",
                "stock": 30,
                "featured": False,
                "in_stock": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Whiskas Cat Food Pouch",
                "category": "cat",
                "price": 299,
                "description": "Delicious ocean fish flavor that cats love, complete nutrition",
                "image_url": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=85&fit=crop",
                "stock": 30,
                "featured": True,
                "in_stock": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Meo Persian Cat Food",
                "category": "cat",
                "price": 449,
                "description": "Specially formulated for Persian cats with omega-3 fatty acids",
                "image_url": "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=85&fit=crop",
                "stock": 25,
                "featured": False,
                "in_stock": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Premium Bird Seeds Mix",
                "category": "bird",
                "price": 199,
                "description": "Nutritious seed mix for all types of pet birds including parakeets",
                "image_url": "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=85&fit=crop",
                "stock": 75,
                "featured": False,
                "in_stock": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Parrot Food Pellets",
                "category": "bird",
                "price": 349,
                "description": "Complete nutrition pellets for parrots and large birds with vitamins",
                "image_url": "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=800&q=85&fit=crop",
                "stock": 40,
                "featured": True,
                "in_stock": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Aquarium Fish Food Flakes",
                "category": "fish",
                "price": 149,
                "description": "Balanced nutrition flakes for all aquarium fish species including goldfish",
                "image_url": "https://images.unsplash.com/photo-1520990842772-0dfa67c0dbc1?w=800&q=85&fit=crop",
                "stock": 100,
                "featured": False,
                "in_stock": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Aquarium Filter System",
                "category": "fish",
                "price": 799,
                "description": "Advanced filtration system for clean and healthy aquarium water",
                "image_url": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&q=85&fit=crop",
                "stock": 20,
                "featured": True,
                "in_stock": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.products.insert_many(products)
        
        # Seed reviews
        reviews = [
            {
                "id": str(uuid.uuid4()),
                "customer_name": "Rajesh Kumar",
                "rating": 5,
                "comment": "Best pet store in Dadri! Quality products at affordable prices.",
                "date": datetime.now(timezone.utc).isoformat(),
                "approved": True
            },
            {
                "id": str(uuid.uuid4()),
                "customer_name": "Priya Sharma",
                "rating": 5,
                "comment": "My dog loves the food from here. Great service and friendly staff!",
                "date": datetime.now(timezone.utc).isoformat(),
                "approved": True
            },
            {
                "id": str(uuid.uuid4()),
                "customer_name": "Amit Singh",
                "rating": 4,
                "comment": "Wide variety of pet products. Highly recommended for all pet owners.",
                "date": datetime.now(timezone.utc).isoformat(),
                "approved": True
            }
        ]
        await db.reviews.insert_many(reviews)
        
        # Seed gallery images with high-quality HD images - 4 per category
        gallery_images = [
            # Dog images (4)
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&q=90&fit=crop",
                "caption": "Happy Golden Retriever",
                "category": "dog",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&q=90&fit=crop",
                "caption": "Playful Puppy",
                "category": "dog",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=1920&q=90&fit=crop",
                "caption": "Cute Dog Portrait",
                "category": "dog",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&q=90&fit=crop",
                "caption": "Dogs Playing Together",
                "category": "dog",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            # Cat images (4)
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1920&q=90&fit=crop",
                "caption": "Beautiful Tabby Cat",
                "category": "cat",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1920&q=90&fit=crop",
                "caption": "Curious Persian Cat",
                "category": "cat",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1920&q=90&fit=crop",
                "caption": "Cute Cat Looking",
                "category": "cat",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1495360019602-e001922271fe?w=1920&q=90&fit=crop",
                "caption": "Relaxing Cat",
                "category": "cat",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            # Bird images (4)
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1444464666168-aa57e8e82e7c?w=1920&q=90&fit=crop",
                "caption": "Colorful Parrot",
                "category": "bird",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=1920&q=90&fit=crop",
                "caption": "Beautiful Macaw",
                "category": "bird",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1920&q=90&fit=crop",
                "caption": "Cute Parakeet",
                "category": "bird",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1452570053594-1b985d6ea218?w=1920&q=90&fit=crop",
                "caption": "Elegant Bird",
                "category": "bird",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            # Fish images (4)
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=1920&q=90&fit=crop",
                "caption": "Tropical Aquarium Fish",
                "category": "fish",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1520990842772-0dfa67c0dbc1?w=1920&q=90&fit=crop",
                "caption": "Beautiful Betta Fish",
                "category": "fish",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=90&fit=crop",
                "caption": "Clownfish in Coral",
                "category": "fish",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "image_url": "https://images.unsplash.com/photo-1516683037151-9a17e3bf5836?w=1920&q=90&fit=crop",
                "caption": "Colorful Koi Fish",
                "category": "fish",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.gallery.insert_many(gallery_images)
        
        logger.info("Initial data seeded successfully")
    except Exception as e:
        logger.error(f"Error seeding data: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


# Products API
@app.get("/api/products", response_model=List[Product])
async def get_products(category: Optional[str] = None, search: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    products = []
    async for product in db.products.find(query, {"_id": 0}):
        if isinstance(product.get('created_at'), str):
            product['created_at'] = datetime.fromisoformat(product['created_at'])
        products.append(Product(**product))
    return products

@app.get("/api/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if isinstance(product.get('created_at'), str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    return Product(**product)

@app.post("/api/products", response_model=Product)
async def create_product(product: ProductCreate, admin: str = Depends(verify_admin)):
    product_obj = Product(**product.model_dump())
    doc = product_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.products.insert_one(doc)
    return product_obj

@app.put("/api/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductUpdate, admin: str = Depends(verify_admin)):
    existing = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = {k: v for k, v in product.model_dump().items() if v is not None}
    if update_data:
        await db.products.update_one({"id": product_id}, {"$set": update_data})
    
    updated = await db.products.find_one({"id": product_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    return Product(**updated)

@app.delete("/api/products/{product_id}")
async def delete_product(product_id: str, admin: str = Depends(verify_admin)):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}


# Categories API
@app.get("/api/categories")
async def get_categories():
    categories = [
        {"name": "dog", "label": "Dogs", "icon": "Dog"},
        {"name": "cat", "label": "Cats", "icon": "Cat"},
        {"name": "bird", "label": "Birds", "icon": "Bird"},
        {"name": "fish", "label": "Fish", "icon": "Fish"}
    ]
    return categories


# Reviews API
@app.get("/api/reviews", response_model=List[Review])
async def get_reviews():
    reviews = []
    async for review in db.reviews.find({"approved": True}, {"_id": 0}).sort("date", -1):
        if isinstance(review.get('date'), str):
            review['date'] = datetime.fromisoformat(review['date'])
        reviews.append(Review(**review))
    return reviews

@app.post("/api/reviews", response_model=Review)
async def create_review(review: ReviewCreate):
    review_obj = Review(**review.model_dump())
    doc = review_obj.model_dump()
    doc['date'] = doc['date'].isoformat()
    await db.reviews.insert_one(doc)
    return review_obj


# Gallery API
@app.get("/api/gallery", response_model=List[GalleryImage])
async def get_gallery():
    images = []
    async for image in db.gallery.find({}, {"_id": 0}).sort("created_at", -1):
        if isinstance(image.get('created_at'), str):
            image['created_at'] = datetime.fromisoformat(image['created_at'])
        images.append(GalleryImage(**image))
    return images


# Contact API
@app.post("/api/contact", response_model=ContactMessage)
async def create_contact_message(message: ContactMessageCreate):
    message_obj = ContactMessage(**message.model_dump())
    doc = message_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return message_obj


# Admin API
@app.post("/api/admin/login")
async def admin_login(input: AdminLogin):
    if input.username == "admin" and input.password == "drools2024":
        return {"success": True, "token": "admin-token-123"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/stats")
async def get_stats(admin: str = Depends(verify_admin)):
    total_products = await db.products.count_documents({})
    total_reviews = await db.reviews.count_documents({})
    pending_reviews = await db.reviews.count_documents({"approved": False})
    total_contacts = await db.contact_messages.count_documents({})
    
    return {
        "total_products": total_products,
        "total_reviews": total_reviews,
        "pending_reviews": pending_reviews,
        "total_contacts": total_contacts
    }
