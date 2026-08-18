import { useDisplayRecipes, handleDelete } from "../../database/recipeActions";

export default function RecipeList({ ingredientList }) {
  const recipes = useDisplayRecipes();

  return (
    <ul>
      {recipes?.map((recipe) => (
        <li className="border px-5 py-2" key={recipe.id}>
          <h3 className="text-2xl font-semibold">{recipe.name}</h3>
          <ul>
            <h4 className="text-xl">Zutaten:</h4>
            {recipe.ingredients?.map((item) => {
              const ingredient = ingredientList.find(
                (ing) => ing.id === item.ingredientId,
              );
              return (
                <li key={item.ingredientId}>
                  {ingredient?.name}: {item.amount} {ingredient?.unit}
                </li>
              );
            })}
          </ul>
          <div className="my-8">
            <h4 className="text-xl">Zubereitung:</h4>
            <p>{recipe.instructions}</p>
          </div>

          <button onClick={() => handleDelete(recipe.id)} className="button">
            Rezept löschen
          </button>
        </li>
      ))}
    </ul>
  );
}
