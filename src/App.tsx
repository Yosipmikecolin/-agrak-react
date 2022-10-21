import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from "./components/home";
import Update from "./components/update";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/create-user",
      element: <Update />,
    },

    {
      path: "/eliminar",
      element: <div>Hello world!</div>,
    }
  ]);


  return (

    <>
      <RouterProvider router={router} />
    </>


  );
}

export default App;
