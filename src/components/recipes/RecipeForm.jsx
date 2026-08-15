import { addRecipe } from "../../database/recipeActions.js";
import { useDisplayDbEntries, useDisplayRecipes } from "../../database/recipeActions.js";

export default function RecipeForm() {
  const ingredientList = useDisplayDbEntries();
  const recipes = useDisplayRecipes();

  return (
    <div className="border mt-10 p-5">
      <h2>Rezept Hinzufügen</h2>
      <form className="flex items-center gap-5 py-5 px-3" action={addRecipe}>
        <input
          type="text"
          placeholder="Rezeptname"
          name="name"
          className="h-fit"
        />
        <ul>
          {ingredientList?.map((ing) => (
            <li key={ing.id}>
              <div className="flex gap-3">
                <input type="checkbox" />
                <div className="flex gap-3 justify-between w-full">
                  <p>{ing.name}</p>
                  <p>
                    {ing.currentStock}
                    {ing.unit}
                  </p>
                  <input type="number" className="w-fit" />
                </div>
              </div>
            </li>
          ))}
          <div className="flex">
            <input type="text" placeholder="Zutat hinzufügen" />
            <button className="button">+</button>
          </div>
        </ul>
        <textarea
          name="prep"
          id=""
          className="border"
          placeholder="Zubereitung"
        ></textarea>
        <input type="number" name="servings" id="" placeholder="Portionen" />
        <button className="button">Hinzufügen</button>
      </form>

          <ul>
            {recipes?.map((recipe) => (
                <li key={recipe.id}>
                    <p>{recipe.name}</p>
                    <p>{recipe.instructions}</p>
                    <p>{recipe.servings}</p>
                </li>
            )
            )}
          </ul>
    </div>
  );
}
