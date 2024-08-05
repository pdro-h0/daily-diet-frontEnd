import React from "react";
import Button from "../../components/button";

interface DeleteMealModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: () => void
}

const DeleteMealModal = ({ setIsModalOpen, handleClick }: DeleteMealModalProps) => {
  return (
    <div className="inset-0 fixed bg-black/60 flex items-center justify-center ">
      <div className="bg-white pt-10 w-80 h-48 rounded-md space-y-8">
        <h1 className="font-semibold text-center break-words px-11">
          Deseja realmente excluir o registro da refeição?
        </h1>

        <div className="flex justify-center items-center w-72 m-auto gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            type="button"
            className="bg-white rounded-md py-3 w-full text-gray-800 border border-gray-800 font-semibold"
          >
            Cancelar
          </button>
          <Button 
          onClick={handleClick}
          className="-mb-0" type="button">
            Sim, excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMealModal;
