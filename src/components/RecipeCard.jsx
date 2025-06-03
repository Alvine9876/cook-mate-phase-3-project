export default function RecipeCard({ recipe, onClick }) {
  return (
    <div
      onClick={() => onClick(recipe)}
      className="bg-white rounded-2xl shadow hover:shadow-xl cursor-pointer transition duration-300 overflow-hidden"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h2>
        <p className="text-sm text-gray-500">Ready in {recipe.readyInMinutes} minutes</p>
      </div>
    </div>
  );
}
