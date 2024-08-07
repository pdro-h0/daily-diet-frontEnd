import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Statistics from "./statistics";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMealsStatistics } from "../../store/slices/statistics";
import { ArrowBackIcon } from "@chakra-ui/icons";

const MealsDetails = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("test-token");

  const dispatch = useAppDispatch();
  const { maxStreak, mealsCount, mealsInDiet, mealsOutOfDiet } = useAppSelector(
    (state) => {
      const mealsCount = state.statistics.mealsCount;
      const maxStreak = state.statistics.maxStreak;
      const mealsInDiet = state.statistics.mealsInDiet;
      const mealsOutOfDiet = state.statistics.mealsOutOfDiet;

      return {
        mealsCount,
        maxStreak,
        mealsInDiet,
        mealsOutOfDiet,
      };
    }
  );

  useEffect(() => {
    if (!token || token === "undefined") navigate("/");

    dispatch(fetchMealsStatistics(token));
  }, [dispatch, token, navigate]);

  const displayPercentage = (mealsInDiet / mealsCount) * 100;

  return (
    <div>
      <div
        onClick={() => navigate("/diet-details")}
        className={`${
          displayPercentage >= 50 ? "bg-lime-300" : "bg-red-300"
        } w-full h-52 text-center py-5 relative`}
      >
        <span className="text-2xl text-center font-bold">
          {mealsInDiet ? displayPercentage.toFixed(2) : 0}%
        </span>
        <span className="text-lg block">das refeições dentro da dieta</span>

        <button className="size-6 absolute top-4 left-6">
          <ArrowBackIcon boxSize={25} />
        </button>
      </div>

      <div className="rounded-t-3xl z-50 relative py-5 -mt-20 bg-white px-6">
        <h4 className="text-center font-bold mt-8 mb-6">Estatísticas gerais</h4>

        <div className="flex flex-col gap-3">
          <Statistics
            amount={maxStreak}
            bgColor="bg-gray-300"
            text="melhor sequência de pratos dentro da dieta"
          />

          <Statistics
            amount={mealsCount}
            bgColor="bg-gray-300"
            text="refeições registradas"
          />

          <div className="flex gap-3">
            <Statistics
              amount={mealsInDiet}
              bgColor="bg-lime-300"
              text="refeições dentro da dieta"
            />

            <Statistics
              amount={mealsOutOfDiet}
              bgColor="bg-red-300"
              text="refeições fora da dieta"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsDetails;
