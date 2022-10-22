import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
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
      <Toaster />
      <RouterProvider router={router} />
    </>


  );
}

export default App;
