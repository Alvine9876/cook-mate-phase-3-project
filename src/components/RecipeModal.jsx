export default function RecipeModal({ recipe, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-y-auto max-h-[90vh] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{recipe.title}</h2>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-4"><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>

        {recipe.extendedIngredients && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Ingredients:</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              {recipe.extendedIngredients.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
              ))}
            </ul>
          </div>
        )}

        {recipe.analyzedInstructions?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Instructions:</h3>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
