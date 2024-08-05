import { FormEvent, useEffect, useState } from "react";
import MealForm from "../../components/meal-form";
import { api } from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

const EditMeal = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateAndHour, setDateAndHour] = useState<string>("");
  const [isOnDiet, setIsOnDiet] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("test-token");

  const editMeal = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    
    await api.put(
      `/meal/${id}`,
      {
        date: dateAndHour === "" ? new Date() : dateAndHour,
        description,
        isOnDiet,
        name,
        token,
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
