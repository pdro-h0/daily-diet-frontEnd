import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "./button";

interface MealFormProps {
  name: string;
  description: string;
  dateAndHour: string;
  isOnDiet: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setDateAndHour: Dispatch<SetStateAction<string>>;
  setIsOnDiet: Dispatch<SetStateAction<boolean>>;
  createMeal?: (ev: FormEvent<HTMLFormElement>) => void;
  editMeal?: (ev: FormEvent<HTMLFormElement>) => void;
  buttonText: string;
}

const MealForm = (props: MealFormProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <form
      className=" flex gap-6 flex-col rounded-t-3xl py-5 z-50 px-6 relative -mt-14 bg-white"
      onSubmit={props.createMeal ?? props.editMeal}
    >
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="name">
          Nome
        </label>
        <input
          required
          className="outline-gray-400 border border-gray-300 rounded-md py-2 px-1"
          onChange={(ev) => props.setName(ev.target.value)}
          value={props.name}
          type="text"
          id="name"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold" htmlFor="description">
          Descrição
        </label>
        <textarea
          required
          className="outline-gray-400 border border-gray-300 rounded-md px-1"
          onChange={(ev) => props.setDescription(ev.target.value)}
          value={props.description}
          name="description"
          id="description"
          rows={5}
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label className="font-bold" htmlFor="date-and-hour">
          Data e hora
        </label>
        <input
          className="outline-gray-400 border border-gray-300 rounded-md py-2 px-1"
          value={props.dateAndHour}
          onChange={(ev) => props.setDateAndHour(ev.target.value)}
          type="datetime-local"
          name="date-and-hour"
          id="date-and-hour"
        />
      </div>

      <h4>Está dentro da dieta?</h4>
      <div className="flex justify-between max-xsm:flex-wrap gap-y-6">
        <button
          type="button"
          onClick={() => {
            props.setIsOnDiet(true);
            setIsActive(true);
          }}
          className={`${
            isActive && props.isOnDiet
              ? "bg-lime-200 border border-lime-500"
              : "bg-gray-200 border"
          } py-2 px-12 rounded-md flex items-center gap-2 max-xsm:w-full justify-center `}
          name="isOnDiet"
        >
          <div className="rounded-full size-2 bg-lime-700" />
          Sim
        </button>

        <button
          type="button"
          onClick={() => {
            props.setIsOnDiet(false);
            setIsActive(true);
          }}
          className={`${
            isActive && !props.isOnDiet
              ? "bg-red-400 border border-red-500"
              : "bg-gray-200 border"
          } py-2 px-12 rounded-md flex items-center gap-2 max-xsm:w-full justify-center`}
        >
          <div className="rounded-full size-2 bg-red-700" />
          Não
        </button>
      </div>

      <Button>{props.buttonText}</Button>
    </form>
  );
};

export default MealForm;
