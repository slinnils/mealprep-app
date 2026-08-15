import { useState } from "react";
import { addRecipe } from "../../database/recipeActions.js";
import { useDisplayDbEntries } from "../../database/recipeActions.js";
import { addQuickIngredient } from "../../database/ingredientsActions.js";
import RecipeList from "./RecipeList.jsx";

export default function RecipeForm() {
  const ingredientList = useDisplayDbEntries();

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [newIngredientUnit, setNewIngredientUnit] = useState("g");

  function handleToggleIngredient(ingredientId, isChecked) {
    if (isChecked) {
      setSelectedIngredients((prev) => [...prev, { ingredientId, amount: "" }]);
    } else {
      setSelectedIngredients((prev) =>
        prev.filter((item) => item.ingredientId !== ingredientId),
      );
    }
  }

  function handleAmountChange(ingredientId, amount) {
    setSelectedIngredients((prev) =>
      prev.map((item) =>
        item.ingredientId === ingredientId ? { ...item, amount } : item,
      ),
    );
  }

  const [newIngredientName, setNewIngredientName] = useState("");

  async function handleAddNewIngredient() {
    const newId = await addQuickIngredient(newIngredientName);
    if (!newId) return;

    setSelectedIngredients((prev) => [
      ...prev,
      { ingredientId: newId, amount: "" },
    ]);
    setNewIngredientName("");
  }

  return (
    <div className="border mt-10 p-5">
      <h2>Rezept Hinzufügen</h2>
      <form
        className="flex items-center gap-5 py-5 px-3"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          addRecipe(formData, selectedIngredients);
          setSelectedIngredients([])
          event.target.reset();
        }}
      >
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
                <input
                  type="checkbox"
                  checked={selectedIngredients.some(
                    (item) => item.ingredientId === ing.id,
                  )}
                  onChange={(e) =>
                    handleToggleIngredient(ing.id, e.target.checked)
                  }
                />
                <div className="flex gap-3 justify-between w-full">
                  <p>{ing.name}</p>
                  <p>
                    {ing.currentStock}
                    {ing.unit}
                  </p>
                  {selectedIngredients.some(
                    (item) => item.ingredientId === ing.id,
                  ) && (
                    <input
                      type="number"
                      className="w-10"
                      value={
                        selectedIngredients.find(
                          (item) => item.ingredientId === ing.id,
                        )?.amount ?? ""
                      }
                      onChange={(e) =>
                        handleAmountChange(ing.id, e.target.value)
                      }
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
          <div className="flex">
            <input
              type="text"
              placeholder="Zutat hinzufügen"
              value={newIngredientName}
              onChange={(e) => setNewIngredientName(e.target.value)}
            />
            <select
              value={newIngredientUnit}
              onChange={(e) => setNewIngredientUnit(e.target.value)}
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
              <option value="stück">stück</option>
            </select>
            <button
              type="button"
              className="button"
              onClick={handleAddNewIngredient}
            >
              +
            </button>
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

      <RecipeList
        ingredientList={ingredientList}
        selectedIngredients={selectedIngredients}
      />
    </div>
  );
}
