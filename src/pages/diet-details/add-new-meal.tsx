import { useNavigate } from "react-router-dom";

const AddNewMeal = () => {
  const navigate = useNavigate();

  return (
    <div className=" mt-10 mb-8">
      <h3>Refeições</h3>

      <button
        onClick={() => navigate("/new-meal")}
        className="w-full py-4 bg-gray-800 rounded-lg text-white mt-2"
      >
        + Nova refeição
      </button>
    </div>
  );
};

export default AddNewMeal;
