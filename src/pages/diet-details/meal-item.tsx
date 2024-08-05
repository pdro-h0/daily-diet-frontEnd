import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface mealItemProps {
  meal: {
    id: number;
    name: string;
    description: string;
    date: Date;
    isOnDiet: boolean;
    userId: string;
  };
}

const MealItem = ({ meal }: mealItemProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-12" onClick={() => navigate(`/about-meal/${meal.id}`)}>
      <div className="border border-gray-500 rounded-md mt-2 flex items-center px-4 h-12">
        <span className="font-bold">{format(meal.date, "HH:mm")}</span>
        <div className="h-[0.875rem] w-px mx-2 bg-gray-500" />
        <span className="flex-1">{meal.name}</span>
        <div
          className={`${
            meal.isOnDiet ? " bg-lime-400" : "bg-red-400"
          } size-3 rounded-full`}
        />
      </div>
    </div>
  );
};

export default MealItem;
