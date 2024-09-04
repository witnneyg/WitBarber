import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home-page/index.tsx";
import App from "./App.tsx";

import "./index.css";
import { BarbershopPage } from "./pages/barbershop-page/index.tsx";
import { Toaster } from "sonner";

document.documentElement.classList.add("dark");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/barbershop/:id",
        element: <BarbershopPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>
);
