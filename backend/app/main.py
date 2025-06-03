from fastapi import FastAPI
from app.routes import recipes

app = FastAPI()

app.include_router(recipes.router)
