export default function RecipeForm() {
  return (
    <div className="border mt-10 p-5">
    <h2>Rezept Hinzufügen</h2>
      <form
        className="flex items-center gap-5 py-5 px-3"
        action=""
      >
        <input
          type="text"
          placeholder="Rezeptname"
          name="name"
          className="h-fit"
        />
        <select
          multiple
          size="1"
          name=""
          id=""
          className="bg-gray-600 text-mauve-300"
        >
          <option value="">Reis</option>
          <option value="">Tomaten</option>
          <option value="">Kidneybohnen</option>
          <option value="">Mais</option>
          <option value="">Poulet</option>
        </select>
        <textarea name="prep" id="" className="border" placeholder="Zubereitung"></textarea>
        <input type="number" name="servings" id="" placeholder="Portionen" />
      </form>
    </div>
  );
}
