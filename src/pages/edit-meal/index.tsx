import { FormEvent, useEffect, useState } from "react";
import MealForm from "../../components/meal-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { editMealHandler } from "../../store/slices/meals";

const EditMeal = () => {
  const { id } = useParams();

  const { mealName, mealDateAndHour, mealDescription, mealIsOnDiet } =
    useAppSelector((state) => {
      const meal = state.meals.find((item) => item.id === +id!);

      const mealName = meal!.name;
      const mealDescription = meal!.description;
      const mealDateAndHour = meal!.date;
      const mealIsOnDiet = meal!.isOnDiet;

      return {
        mealName,
        mealDescription,
        mealDateAndHour,
        mealIsOnDiet,
      };
    });

  const [name, setName] = useState<string>(mealName);
  const [description, setDescription] = useState<string>(mealDescription);
  const [dateAndHour, setDateAndHour] = useState<string>(mealDateAndHour);
  const [isOnDiet, setIsOnDiet] = useState<boolean>(mealIsOnDiet);

  const navigate = useNavigate();

  const token = sessionStorage.getItem("test-token");

  const dispatch = useAppDispatch();

  const editMeal = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    dispatch(
      editMealHandler({
        id,
        data: {
          date: dateAndHour === "" ? new Date() : dateAndHour,
          description,
          isOnDiet,
          name,
        },
        token: token!,
      })
    );

    navigate("/diet-details");
  };

  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  return (
    <MealForm
      name={name}
      description={description}
      dateAndHour={dateAndHour}
      isOnDiet={isOnDiet}
      setName={setName}
      setDescription={setDescription}
      setDateAndHour={setDateAndHour}
      setIsOnDiet={setIsOnDiet}
      editMeal={editMeal}
      buttonText="Editar refeição"
    />
  );
};

export default EditMeal;
