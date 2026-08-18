import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

export async function addPlanEntry(date, recipeId) {
  await db.planEntries.add({
    date,
    recipeId,
    cooked: false,
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