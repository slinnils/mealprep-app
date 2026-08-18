import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

export async function addPlanEntry(date, recipeId, cooked) {
  await db.planEntries.add({
    date,
    recipeId,
    cooked,
  });
}

export async function handleDeletePlanEntry(id) {
  await db.planEntries.delete(id);
}

export async function updatePlanEntry(id, recipeId) {
  await db.planEntries.update(id, { recipeId });
}

export function useDisplayPlanEntries() {
  return useLiveQuery(() => db.planEntries.toArray());
}

export async function markAsCooked(entry) {
  if (entry.cooked === true) return;

  const confirmed = window.confirm(
    "Möchtest du das Rezept wirklich abschliessen? Die Zutaten werden dann vom Inventar gelöscht.",
  );

  if (!confirmed) return;

  const recipe = await db.recipes.get(entry.recipeId);

  await db.transaction("rw", db.ingredients, db.planEntries, async () => {
    for (const item of recipe.ingredients) {
      const ingredient = await db.ingredients.get(item.ingredientId);
      const newStock = ingredient.currentStock - item.amount;
      await db.ingredients.update(item.ingredientId, {
        currentStock: newStock,
      });
    }

    await db.planEntries.update(entry.id, { cooked: true });
  });
}
