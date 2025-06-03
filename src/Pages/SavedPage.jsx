
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function SavedPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);




async function handleFavorite(recipe) {
  try {
    const response = await fetch("http://localhost:8000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
        body: JSON.stringify({
        recipe_id: recipe.id,
        title: recipe.title || "", // fallback if missing
        image: recipe.image || "",
        youtube: recipe.youtube || "", // safely fallback
        instructions: recipe.instructions || "",
      }),
    });


    if (response.ok) {
      alert("Recipe saved to favorites!");
    } else {
      alert("Failed to save recipe.");
    }
  } catch (err) {
    alert("An error occurred while saving.");
  }
}



async function fetchSaved() {
  const res = await fetch("http://localhost:8000/favorites");
  const data = await res.json();
  setSavedRecipes(data);
  setLoading(false);
}








  async function removeRecipe(recipeId) {
    await fetch(`http://localhost:8000/favorites/${recipeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setSavedRecipes(savedRecipes.filter(r => r.recipe_id !== recipeId));


  }

  useEffect(() => {
    fetchSaved();
  }, []);

  if (loading) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Saved Recipes ❤️</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {savedRecipes.map((recipe) => (
          <div key={recipe.recipe_id} className="bg-zinc-800 rounded-lg p-4 w-72 shadow-md">


            <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded" />
            <a href={recipe.youtube} target="_blank" rel="noopener noreferrer">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded cursor-pointer hover:opacity-80 transition"
              />
            </a>

           <button
             onClick={() => alert("More details coming soon!")} // Replace with real behavior later
             className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-full"
           >
            🍽️ View Recipe
           </button>


            <h3 className="text-white mt-2">{recipe.title}</h3>
            <button
              onClick={() => removeRecipe(recipe.recipe_id)}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-full"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
