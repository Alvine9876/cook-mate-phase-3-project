export default function RecipeCard({ recipe, onFavorite, onViewVideo }) {
  return (
    <div className="bg-zinc-900 rounded-lg w-full sm:w-72 overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_5px_rgba(255,0,0,0.5)]">
      
      {/* Image section */}
      <div
        className="cursor-pointer h-48 md:h-56 overflow-hidden"
        onClick={() => onViewVideo(recipe)}
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <div className="px-4 pt-2 text-white font-bold text-lg truncate">
        {recipe.title}
      </div>

      {/* Buttons section */}
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={() => onFavorite(recipe.title)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
        >
          ❤️ Save
        </button>
        <button
          onClick={() => onViewVideo(recipe)}
          className="bg-red-800 hover:bg-red-900 text-white px-3 py-1 rounded-full"
        >
          📺 Watch
        </button>
      </div>
    </div>
  );
}
