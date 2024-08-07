import { useEffect } from "react";
import AddNewMeal from "./add-new-meal";
import DietPercentage from "./diet-percentage";
import Header from "./header";
import MealItem from "./meal-item";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMeals } from "../../store/slices/meals";

export interface Meal {
  id: number;
  name: string;
  description: string;
  date: Date;
  isOnDiet: boolean;
  userId: string;
}

const DietDetails = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("test-token");

  const dispatch = useAppDispatch();
  const meals = useAppSelector((state) => state.meals);

  useEffect(() => {
    if (!token || token === "undefined") navigate("/");
    dispatch(fetchMeals(token!));
  }, [dispatch, token, navigate]);

  if (!meals) return <h1>Não há refeiçoes ainda...</h1>;

  return (
    <div className="px-6">
      <Header />

      <DietPercentage />

      <AddNewMeal />

      {meals.length > 0 ? (
        meals.map((meal) => (
          <div key={meal.id}>
            <span className="font-bold text-2xl">
              {format(meal.date, "dd/MM/yyyy")}
            </span>
            <MealItem meal={meal} />
          </div>
        ))
      ) : (
        <p>Voce anida não cadastrou nenhuma refeição</p>
      )}
    </div>
  );
};

export default DietDetails;
