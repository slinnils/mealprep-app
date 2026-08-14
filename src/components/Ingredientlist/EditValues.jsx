import { handleSaveEdit } from "./ingredientActions";

export default function EditValues({
  editIngValues,
  onInputChange,
  editItem,
  setEditItem,
}) {
  return (
    <form
      className="flex"
      onSubmit={async (event) => {
        await handleSaveEdit(event, editIngValues, editItem);
        setEditItem(null);
      }}
    >
      <input
        value={editIngValues.name}
        onChange={(e) => onInputChange("name", e.target.value)}
      />
      <input
        className="w-15 px-1"
        type="number"
        step="0.1"
        value={editIngValues.currentStock}
        onChange={(e) => onInputChange("currentStock", e.target.value)}
      />

      <input
        className="w-15 px-1"
        type="number"
        step="0.1"
        value={editIngValues.minStock}
        onChange={(e) => onInputChange("minStock", e.target.value)}
      />
      <select
        className="border"
        name="unit"
        id=""
        value={editIngValues.unit}
        onChange={(e) => onInputChange("unit", e.target.value)}
      >
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="l">l</option>
        <option value="stück">stück</option>
      </select>
      <button>Speichern</button>
    </form>
  );
}
