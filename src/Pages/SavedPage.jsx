import { useEffect, useState } from "react";

export default function SavedPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add this useEffect to load data when component mounts
  useEffect(() => {
    fetchSaved();
  }, []);

  async function fetchSaved() {
    try {
      const res = await fetch("http://localhost:8000/favorites");
      const data = await res.json();
      setSavedRecipes(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  // Update the remove function
  async function removeRecipe(id) {
    try {
      const response = await fetch(`http://localhost:8000/favorites/${id}`, {
        method: "DELETE"
      });
      
      if (!response.ok) throw new Error("Failed to delete");
      
      // Refresh the list after deletion
      fetchSaved();
      alert("Recipe removed!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to remove recipe.");
    }
  }

  // Update the map function to use consistent IDs
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Saved Recipes ❤️</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {savedRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-zinc-800 rounded-lg p-4 w-72 shadow-md">
            {/* ... rest of your JSX ... */}
            <button
              onClick={() => removeRecipe(recipe.id)}  // Changed to recipe.id
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