import { db } from "./db.js";
import { useLiveQuery } from "dexie-react-hooks";

export async function ingredientsAction(formData) {
  const name = formData.get("name");
  const currentStock = formData.get("currentStock");
  const unit = formData.get("unit");
  const minStock = formData.get("minStock");

  if (!name || !currentStock) return;

  await db.ingredients.add({
    name: name,
    currentStock: Number(currentStock),
    unit,
    minStock: Number(minStock) || 0,
  });
}

export async function handleDelete(id) {
  const confirmed = window.confirm("Diese Zutat wirklich löschen?");
  if (!confirmed) return;

  await db.ingredients.delete(id);
}

export async function handleSaveEdit(event, editIngValues, editItem) {
  event.preventDefault();

  if (!editIngValues.name || !editIngValues.currentStock) return;

  await db.ingredients.update(editItem, {
    name: editIngValues.name,
    currentStock: Number(editIngValues.currentStock),
    unit: editIngValues.unit,
    minStock: Number(editIngValues.minStock) || 0,
  });
}

export function useDisplayDbEntries() {
  return useLiveQuery(() => db.ingredients.toArray());
}
