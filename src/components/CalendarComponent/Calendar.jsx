import { useRef, useState } from "react";
import {
  useDisplayPlanEntries,
  addPlanEntry,
  updatePlanEntry,
} from "../../database/planActions.js";
import { useDisplayRecipes } from "../../database/recipeActions.js";
import DayCard from "./DayCard.jsx";
import Modal from "../Modal.jsx";
import { useDisplayDbEntries } from "../../database/ingredientsActions.js";
import RecipeDetail from "./RecipeDetail.jsx";

function getNext7Days() {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

export default function Calendar() {
  const planEntries = useDisplayPlanEntries();
  const recipes = useDisplayRecipes();
  const ingredients = useDisplayDbEntries();
  const days = getNext7Days();
  const dialog = useRef();

  const [selectedDay, setSelectedDay] = useState();
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [viewingRecipe, setViewingRecipe] = useState(null);

  const dayMonth = selectedDay
    ? new Date(selectedDay).toLocaleDateString("de-CH", {
        day: "numeric",
        month: "short",
      })
    : "";

  function onOpenModal(date, entryId = null) {
    setSelectedDay(date);
    setSelectedEntryId(entryId);
    dialog.current.showModal();
  }

  function onClose() {
    dialog.current.close();
    setViewingRecipe(null);
  }

  function onShowDetail(recipe) {
    dialog.current.showModal();
    setViewingRecipe(recipe);
  }

  return (
    <>
      <Modal
        ref={dialog}
        title={
          viewingRecipe === null ? `Wähle ein Menü für den ${dayMonth}` : ""
        }
        onClose={onClose}
      >
        {viewingRecipe !== null ? (
          <RecipeDetail
            ingredients={ingredients}
            viewingRecipe={viewingRecipe}
          />
        ) : (
          <ul className="flex flex-col mt-5">
            {recipes?.map((recipe) => (
              <li key={recipe.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedEntryId) {
                      updatePlanEntry(selectedEntryId, recipe.id);
                    } else {
                      addPlanEntry(selectedDay, recipe.id);
                    }
                    dialog.current.close();
                  }}
                >
                  {recipe.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Modal>

      <div className="border mt-10 p-5 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Wochenplan</h2>
        {days.map((date) => (
          <DayCard
            selectedDay={selectedDay}
            key={date}
            date={date}
            planEntries={planEntries}
            recipes={recipes}
            onOpenModal={onOpenModal}
            onShowDetail={onShowDetail}
          />
        ))}
      </div>
    </>
  );
}
