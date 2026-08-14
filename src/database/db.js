import Dexie from "dexie";

export const db = new Dexie("MealprepDB");

db.version(1).stores({
  ingredients: "++id, name",
  recipes: "++id, name",
  planEntries: "++id, date, recipeId",
});