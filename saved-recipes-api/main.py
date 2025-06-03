from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(
    title="Recipe API",
    description="API for saving, retrieving, and deleting favorite recipes.",
    version="1.0.0"
)

# Allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
saved_recipes = []

class Recipe(BaseModel):
    id: str
    title: str
    image: str

@app.get("/recipes", response_model=List[Recipe])
def get_saved_recipes():
    return saved_recipes

@app.post("/recipes", response_model=Recipe)
def save_recipe(recipe: Recipe):
    for r in saved_recipes:
        if r.id == recipe.id:
            raise HTTPException(status_code=400, detail="Recipe already saved")
    saved_recipes.append(recipe)
    return recipe

@app.delete("/recipes/{recipe_id}")
def delete_recipe(recipe_id: str):
    global saved_recipes
    saved_recipes = [r for r in saved_recipes if r.id != recipe_id]
    return {"message": "Recipe removed"}
