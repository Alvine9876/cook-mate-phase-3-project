import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const API_URL = 'https://api.spoonacular.com/recipes/random?number=6&apiKey=5d6b3aec04794775b2e0bc176c816703';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setRecipes(data.recipes || []);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🍽️ Recipe List</h1>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-600">Loading recipes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={setSelectedRecipe} />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
}
