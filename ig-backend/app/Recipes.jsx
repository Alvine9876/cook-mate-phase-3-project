import React, { useState, useEffect } from "react";

function RecipeSearch() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async (query = "") => {
    const url = query
      ? `http://localhost:8000/recipes?search=${query}`
      : `http://localhost:8000/recipes`;
    const res = await fetch(url);
    const data = await res.json();
    setRecipes(data);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    fetchRecipes(query);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search recipes..."
        className="w-full p-2 border rounded mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold">{recipe.title}</h2>
            <p className="text-sm text-gray-600">{recipe.category}</p>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover mt-2 rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSearch;
