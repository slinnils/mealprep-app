import List from "./List.jsx";
import { ingredientsAction } from "../../database/ingredientsActions.js";

export default function IngredientForm() {
  return (
    <div>
      <form action={ingredientsAction}>
        <h1 className="text-2xl font-bold mb-10">Zutaten Hinzufügen</h1>

        <div className="flex flex-col gap-5 w-100">
          <input type="text" name="name" id="" placeholder="Zutat (z.B Reis)" />

          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              name="currentStock"
              id=""
              placeholder="Vorhandene Menge"
            />
            <input
              type="number"
              step="0.1"
              name="minStock"
              placeholder="Mindestbestand"
            />

            <select className="border" name="unit" id="">
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
              <option value="stück">stück</option>
            </select>

            <button className="button">Hinzufügen</button>
          </div>
        </div>
      </form>

      <div>
        <List />
      </div>
    </div>
  );
}
