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
      path: "/update-user",
      element: <Update />,
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
