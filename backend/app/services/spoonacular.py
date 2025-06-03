import httpx

API_KEY = "5d6b3aec04794775b2e0bc176c816703"
BASE_URL = "https://api.spoonacular.com/recipes"

async def fetch_recipe_info(recipe_id: int):
    url = f"{BASE_URL}/{recipe_id}/information"
    params = {
        "apiKey": API_KEY,
        "includeNutrition": "false"
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        return response.json()
