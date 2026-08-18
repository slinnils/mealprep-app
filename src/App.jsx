import Calendar from "./components/CalendarComponent/Calendar.jsx";
import IngredientForm from "./components/Ingredientlist/IngredientForm.jsx";
import RecipeForm from "./components/recipes/RecipeForm.jsx";

export default function App() {
  return (
    <>
      <IngredientForm />
      <RecipeForm />
      <Calendar />
    </>
  );
}
