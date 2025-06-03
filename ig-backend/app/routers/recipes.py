from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Recipe

router = APIRouter(prefix="/recipes", tags=["recipes"])

# Get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route for getting recipes (with optional search)
@router.get("/")
def get_recipes(search: str = Query(None), db: Session = Depends(get_db)):
    if search:
        recipes = db.query(Recipe).filter(
            Recipe.title.ilike(f"%{search}%") |
            Recipe.category.ilike(f"%{search}%")
        ).all()
    else:
        recipes = db.query(Recipe).all()
    return recipes
