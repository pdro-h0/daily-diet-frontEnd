import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const DietPercentage = () => {
  const [mealsCount, setMealsCount] = useState<number>();
  const [mealsInDiet, setMealsInDiet] = useState<number>();

  const token = sessionStorage.getItem("test-token");

  const fetchData = useCallback(async () => {
    await api
      .get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMealsCount(response.data.mealsCount);
        setMealsInDiet(response.data.mealsInDiet);
      });
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigate = useNavigate();

  if (!mealsCount)
    return (
      <div
        onClick={() => navigate("/meals-details")}
        className="bg-gray-300 w-80 rounded-lg text-center py-5"
      >
        <span className="text-lg block">Não há refeições</span>
      </div>
    );

  if (!mealsInDiet)
    return (
      <div
        onClick={() => navigate("/meals-details")}
        className="bg-red-300 w-80 rounded-lg text-center py-5"
      >
        <span className="text-4xl font-bold">0%</span>
        <span className="text-lg block">das refeições dentro da dieta.</span>
      </div>
    );

  const displayDietPercentage = (mealsInDiet / mealsCount) * 100;

  return (
    <div
      onClick={() => navigate("/meals-details")}
      className={`${
        displayDietPercentage >= 50 ? "bg-lime-300" : "bg-red-300"
      } w-80 rounded-lg text-center py-5`}
    >
      <span className="text-4xl font-bold">
        {displayDietPercentage.toFixed(2) ?? 0}%
      </span>
      <span className="text-lg block">das refeições dentro da dieta</span>
    </div>
  );
};

export default DietPercentage;
