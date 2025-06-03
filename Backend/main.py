from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Recipe data model
class Recipe(BaseModel):
    id: int
    title: str
    description: str
    ingredients: List[str]
    instructions: str

# In-memory "database"
recipes_db = [
    Recipe(
        id=1,
        title="Spaghetti Carbonara",
        description="Classic Italian pasta dish",
        ingredients=["spaghetti", "eggs", "pancetta", "parmesan", "pepper"],
        instructions="Boil pasta. Cook pancetta. Mix eggs and cheese. Combine all."
    ),
    Recipe(
        id=2,
        title="Avocado Toast",
        description="Simple and healthy breakfast",
        ingredients=["bread", "avocado", "salt", "pepper", "lemon juice"],
        instructions="Toast bread. Mash avocado with salt, pepper, lemon. Spread."
    )
]

# Get all recipes
@app.get("/recipes", response_model=List[Recipe])
def get_recipes():
    return recipes_db

# Get a single recipe by ID
@app.get("/recipes/{recipe_id}", response_model=Recipe)
def get_recipe(recipe_id: int):
    for recipe in recipes_db:
        if recipe.id == recipe_id:
            return recipe
    raise HTTPException(status_code=404, detail="Recipe not found")

# Add a new recipe
@app.post("/recipes", response_model=Recipe)
def add_recipe(recipe: Recipe):
    # Check if ID already exists
    for r in recipes_db:
        if r.id == recipe.id:
            raise HTTPException(status_code=400, detail="Recipe ID already exists")
    recipes_db.append(recipe)
    return recipe

# Delete a recipe by ID
@app.delete("/recipes/{recipe_id}", response_model=dict)
def delete_recipe(recipe_id: int):
    for i, recipe in enumerate(recipes_db):
        if recipe.id == recipe_id:
            recipes_db.pop(i)
            return {"message": "Recipe deleted"}
    raise HTTPException(status_code=404, detail="Recipe not found")
