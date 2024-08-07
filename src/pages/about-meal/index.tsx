import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Button from "../../components/button";
import DeleteMealModal from "./delete-meal-modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteMeal, fetchMeals, getMealById } from "../../store/slices/meals";

const AboutMeal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const token = sessionStorage.getItem("test-token");

  useEffect(() => {
    if (!token || token === "undefined") navigate("/");
    dispatch(fetchMeals(token!));
    dispatch(getMealById({ id: id!, token: token! }));
  }, [dispatch, navigate, token, id]);

  const meal = useAppSelector((state) =>
    state.meals.find((item) => item.id === +id!)
  );

  const handleDeleteMeal = async () => {
    dispatch(deleteMeal({ token: token!, id: id! }));
    navigate("/diet-details");
  };

  if (!meal) return;

  const date = format(meal.date, "dd/MM/yyyy 'às' HH:mm");

  return (
    <div className="rounded-t-3xl py-5 z-50 px-6 relative -mt-14 bg-white">
      <h2 className="font-semibold text-2xl break-words">{meal?.name}</h2>
      <p className="break-words mb-6">{meal?.description}</p>

      <h2 className="font-semibold text-lg">Data e hora</h2>
      <span>{date}</span>

      <div className="flex flex-col h-screen">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-1 w-fit rounded-full mt-6">
          <div
            className={`${
              meal.isOnDiet ? "bg-lime-700" : "bg-red-700"
            } size-2 rounded-full`}
          />
          {meal.isOnDiet ? (
            <span>dentro da dieta</span>
          ) : (
            <span>fora da dieta</span>
          )}
        </div>

        <div className="content-end h-full">
          <Button
            className="mb-2"
            onClick={() => navigate(`/edit-meal/${id}`)}
            type="button"
          >
            Editar refeição
          </Button>
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="bg-white rounded-md py-3 w-full text-gray-800 border border-gray-800 font-semibold"
          >
            Excluir refeição
          </button>
        </div>
      </div>
      {isModalOpen && (
        <DeleteMealModal
          handleClick={handleDeleteMeal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default AboutMeal;
