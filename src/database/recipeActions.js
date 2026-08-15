import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

export async function addRecipe(formData, selectedIngredients) {
  const name = formData.get("name");
  const instructions = formData.get("prep");
  const servings = formData.get("servings");

  if (!name || !instructions) return;

  await db.recipes.add({
    name,
    instructions,
    servings: Number(servings) || 1,
    ingredients: selectedIngredients,
  });
}

//Array of all Ingredients:
export function useDisplayDbEntries() {
  return useLiveQuery(() => db.ingredients.toArray());
}

//Rezepte Abrufen:
export function useDisplayRecipes() {
  return useLiveQuery(() => db.recipes.toArray());
}


export async function handleDelete(id) {
  const confirmed = window.confirm("Dieses Rezept wirklich löschen?");
  if (!confirmed) return;

  await db.recipes.delete(id);
}