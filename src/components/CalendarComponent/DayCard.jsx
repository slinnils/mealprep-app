import { handleDeletePlanEntry } from "../../database/planActions.js";

export default function DayCard({
  date,
  planEntries,
  recipes,
  onOpenModal,
  onShowDetail,
}) {
  const entriesForDay =
    planEntries?.filter((entry) => entry.date === date) ?? [];

  const dateObj = new Date(date);
  const weekday = dateObj.toLocaleDateString("de-CH", { weekday: "short" });
  const dayMonth = dateObj.toLocaleDateString("de-CH", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="border-b py-3">
      <p className="font-semibold">
        {weekday}, {dayMonth}
      </p>

      {entriesForDay.length === 0 ? (
        <div className="flex justify-between">
          <p className="text-sm text-gray-400">Kein Rezept geplant</p>
          <button onClick={() => onOpenModal(date)} className="button">Rezept hinzufügen</button>
        </div>
      ) : (
        entriesForDay.map((entry) => {
          const recipe = recipes?.find((r) => r.id === entry.recipeId);
          return (
            <div key={entry.id} className="flex justify-between">
              <button onClick={() => onShowDetail(recipe)} className="cursor-pointer">
                {recipe?.name ?? "Unbekanntes Rezept"}
              </button>
              <button onClick={() => handleDeletePlanEntry(entry.id)} className="button">
                Löschen
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
