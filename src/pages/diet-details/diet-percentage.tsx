import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMealsStatistics } from "../../store/slices/statistics";

const DietPercentage = () => {
  const token = sessionStorage.getItem("test-token");

  const { mealsCount, mealsInDiet } = useAppSelector((state) => {
    const statistic = state.statistics;

    const mealsCount = statistic.mealsCount;
    const mealsInDiet = statistic.mealsInDiet;

    return {
      mealsCount,
      mealsInDiet,
    };
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMealsStatistics(token!));
  }, [dispatch, token]);

  const navigate = useNavigate();

  if (!mealsCount)
    return (
      <div
        onClick={() => navigate("/meals-details")}
        className="bg-gray-300 rounded-lg text-center py-5"
      >
        <span className="text-lg block">Não há refeições</span>
      </div>
    );

  if (!mealsInDiet)
    return (
      <div
        onClick={() => navigate("/meals-details")}
        className="bg-red-300 rounded-lg text-center py-5 relative"
      >
        <span className="text-4xl font-bold">0%</span>
        <span className="text-lg block">das refeições dentro da dieta.</span>

        <ExternalLinkIcon
          className="absolute right-3 top-3"
          boxSize={6}
          color="red.500"
        />
      </div>
    );

  const displayDietPercentage = (mealsInDiet / mealsCount) * 100;

  return (
    <div
      onClick={() => navigate("/meals-details")}
      className={`${
        displayDietPercentage >= 50 ? "bg-lime-300" : "bg-red-300"
      } rounded-lg text-center py-5 relative`}
    >
      <span className="text-4xl font-bold">
        {displayDietPercentage.toFixed(2) ?? 0}%
      </span>
      <span className="text-lg block">das refeições dentro da dieta</span>

      <ExternalLinkIcon
        className="absolute right-3 top-3"
        boxSize={6}
        color="green.500"
      />
    </div>
  );
};

export default DietPercentage;
