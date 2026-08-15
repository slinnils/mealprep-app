import { useDisplayRecipes, handleDelete } from "../../database/recipeActions";

export default function RecipeList({ ingredientList }) {
  const recipes = useDisplayRecipes();

  return (
    <ul>
      {recipes?.map((recipe) => (
        <li className="border" key={recipe.id}>
          <p>{recipe.name}</p>
          <p>{recipe.instructions}</p>
          <p>
            {recipe.servings} {recipe.servings === 1 ? "Portion" : "Portionen"}
          </p>
          <ul>
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
          <button onClick={() => handleDelete(recipe.id)} className="button">DELETE</button>
        </li>
      ))}
    </ul>
  );
}
