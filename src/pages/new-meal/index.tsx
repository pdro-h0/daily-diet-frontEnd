import { useNavigate } from "react-router-dom";
import MealForm from "../../components/meal-form";
import { useState, FormEvent, useEffect } from "react";
import { api } from "../../lib/axios";

const NewMeal = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateAndHour, setDateAndHour] = useState<string>("");
  const [isOnDiet, setIsOnDiet] = useState<boolean>(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("test-token");
  const userId = token?.split(" ")[0];

  const createMeal = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    await api.post(
      "/meal",
      {
        description,
        isOnDiet,
        name,
        date: dateAndHour === "" ? new Date() : dateAndHour,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate("/diet-details");
  };

  useEffect(() => {
    if (!token || token === "undefined") navigate("/");
  }, [token, navigate]);

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
      createMeal={createMeal}
      buttonText="Cadastrar refeição"
    />
  );
};

export default NewMeal;
