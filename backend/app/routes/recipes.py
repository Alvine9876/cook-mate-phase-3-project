from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter()

API_KEY = "5d6b3aec04794775b2e0bc176c816703"
BASE_URL = "https://api.spoonacular.com/recipes"

@router.get("/recipes/{recipe_id}/info")
async def get_recipe_info(recipe_id: int):
    url = f"{BASE_URL}/{recipe_id}/information"
    params = {
        "apiKey": API_KEY,
        "includeNutrition": "false"
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Recipe not found")
        return response.json()
