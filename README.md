##  API Documentation

The backend API is built with FastAPI and includes the following endpoints:

### 🔹 GET /recipes
Returns a list of all saved recipes.

### 🔹 POST /recipes
Saves a new recipe.
- Body: `{ "id": string, "title": string, "image": string }`

### 🔹 DELETE /recipes/{id}
Deletes a recipe by ID.

 You can explore and test the API using Swagger UI:
http://localhost:8000/docs
