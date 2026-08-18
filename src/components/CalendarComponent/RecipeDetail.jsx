export default function RecipeDetail({ viewingRecipe, ingredients }) {
  return (
    <div className="flex flex-col gap-5 text-gray-400">
      <h2 className="text-2xl font-bold">{viewingRecipe.name}</h2>
      <div>
        <h3 className="text-xl font-semibold">Zutaten:</h3>
        <ul>
          {viewingRecipe.ingredients?.map((item) => {
            const ingredient = ingredients.find(
              (i) => i.id === item.ingredientId,
            );
            return (
              <li key={item.ingredientId}>
                {ingredient?.name}: {item.amount} {ingredient?.unit}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Zubereitung:</h3>
        <p>{viewingRecipe.instructions}</p>
      </div>
    </div>
  );
}
