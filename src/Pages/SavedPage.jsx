import { useEffect, useState } from "react";

export default function SavedPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    async function fetchSavedRecipes() {
      const res = await fetch("http://127.0.0.1:8000/recipes");
      const data = await res.json();
      setSavedRecipes(data);
    }
    fetchSavedRecipes();
  }, []);

  async function removeRecipe(id) {
    await fetch(`http://127.0.0.1:8000/recipes/${id}`, {
      method: "DELETE",
    });
    setSavedRecipes(savedRecipes.filter((r) => r.id !== id));
  }

  function viewRecipeDetails(recipe) {
    alert(`Viewing details for: ${recipe.title}`);
  }

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-3xl text-green-700 font-bold mb-6">Saved Recipes</h2>

      {savedRecipes.length === 0 ? (
        <p className="text-black">No recipes saved yet.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {savedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-zinc-900 text-white rounded-lg w-full sm:w-72 shadow-md p-4"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 font-bold text-lg">{recipe.title}</h3>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => viewRecipeDetails(recipe)}
                  className="bg-green-600 hover:bg-green-700 py-2 rounded text-white"
                >
                  View Recipe
                </button>
                <button
                  onClick={() => removeRecipe(recipe.id)}
                  className="bg-red-600 hover:bg-red-700 py-2 rounded text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
