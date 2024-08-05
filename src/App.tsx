import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DietDetails from "./pages/diet-details";
import Login from "./pages/login";
import MealsDetails from "./pages/meals-details";
import NewMeal from "./pages/new-meal";
import DefaultLayout from "./components/default-layout";
import AboutMeal from "./pages/about-meal";
import EditMeal from "./pages/edit-meal";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/diet-details",
      element: <DietDetails />,
    },
    {
      path: "/meals-details",
      element: <MealsDetails />,
    },
    {
      path: "/new-meal",
      element: <DefaultLayout className="bg-gray-300" title="Nova refeição" />,
      children: [{ index: true, element: <NewMeal /> }],
    },
    {
      path: "/about-meal/:id",
      element: <DefaultLayout className="bg-lime-300" title="Refeição" />,
      children: [{ index: true, element: <AboutMeal /> }],
    },
    {
      path: "/edit-meal/:id",
      element: (
        <DefaultLayout className="bg-gray-300" title="Editar refeição" />
      ),
      children: [{ index: true, element: <EditMeal /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
