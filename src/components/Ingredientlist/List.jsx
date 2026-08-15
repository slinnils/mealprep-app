import { handleDelete, useDisplayDbEntries } from "../../database/ingredientsActions.js";
import { useState } from "react";
import EditValues from "./EditValues.jsx";

export default function List() {
  const [editItem, setEditItem] = useState(null);

  const [editIngValues, setEditIngValues] = useState({
    name: "",
    currentStock: "",
    unit: "",
    minStock: "",
  });

  function handleInputChange(identifier, value) {
    setEditIngValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  function handleEditItem(editItem) {
    setEditIngValues({
      name: editItem.name,
      currentStock: editItem.currentStock,
      unit: editItem.unit,
      minStock: editItem.minStock ?? "",
    });
    setEditItem(editItem.id);
  }

  const ingredients = useDisplayDbEntries();

  return (
    <ul className="flex flex-col border w-fit mt-10 py-5 px-7">
      <h2 className="my-3 text-xl font-semibold">Zutatenliste:</h2>

      {ingredients?.map((ing) => (
        <li
          className="flex gap-5 items-center my-2 border px-3 py-2 w-full"
          key={ing.id}
        >
          {editItem !== ing.id ? (
            <>
              <p>
                {ing.name}: {ing.currentStock} {ing.unit} (min: {ing.minStock} {ing.unit})
              </p>
              <div className="flex gap-2 ml-auto">
                <button
                  className="border border-red-500 px-2 py-1 rounded-xl"
                  onClick={() => handleDelete(ing.id)}
                >
                  Löschen
                </button>
                <button
                  onClick={() => handleEditItem(ing)}
                  className="button"
                >
                  Bearbeiten
                </button>
              </div>
            </>
          ) : (
            <EditValues
              editItem={editItem}
              setEditItem={setEditItem}
              onInputChange={handleInputChange}
              editIngValues={editIngValues}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
