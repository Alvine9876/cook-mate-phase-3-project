import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

const BATCH_SIZE = 12;

export default function HomePage({ navSearchQuery }) {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${navSearchQuery}`
        );
        const data = await res.json();
        setRecipes(data.meals || []);
      } catch (err) {
        setError("Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [navSearchQuery]);

  const currentBatch = recipes.slice(0, BATCH_SIZE);

  function handleFavorite(title) {
    if (!favorites.includes(title)) {
      setFavorites([...favorites, title]);
      alert("Added to favorites!");
    } else {
      alert("Already in favorites!");
    }
  }

  function handleViewVideo(recipe) {
    if (recipe.strYoutube) {
      const embedUrl = recipe.strYoutube.replace("watch?v=", "embed/");
      setVideoUrl(embedUrl);
    } else {
      alert("No video available for this recipe.");
    }
  }

  function closeVideo() {
    setVideoUrl(null);
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Trending🔥</h1>

      {loading && (
        <div className="p-6 text-black text-center">Loading recipes...</div>
      )}

      {error && (
        <div className="p-6 text-red-600 text-center">
          Error fetching recipes: {error}
        </div>
      )}

      <div className="flex flex-wrap gap-6 justify-center">
        {currentBatch.length > 0 ? (
          currentBatch.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={{
                id: recipe.idMeal,
                title: recipe.strMeal,
                image: recipe.strMealThumb || "https://via.placeholder.com/150",
              }}
              onFavorite={() => handleFavorite(recipe.strMeal)}
              onViewVideo={() => handleViewVideo(recipe)}
              cardColor="white"
            />
          ))
        ) : (
          <p className="text-black">No recipes found for "{navSearchQuery}"</p>
        )}
      </div>

      {/* ✅ Video modal */}
      {videoUrl && (
        <div
          onClick={closeVideo}
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4"
        >
          <div
            className="bg-black rounded-lg max-w-3xl w-full aspect-video overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={videoUrl}
              title="Recipe Video"
              width="100%"
              height="100%"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
            <button
              onClick={closeVideo}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
            >
              Close Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
