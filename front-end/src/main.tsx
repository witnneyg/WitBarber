import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home-page/index.tsx";
import App from "./App.tsx";

import "./index.css";
import { BarbershopPage } from "./pages/barbershop-page/index.tsx";
import { Toaster } from "sonner";
import { BarbershopsPage } from "./pages/barbershops-page/index.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BookingsPage } from "./pages/bookings-page/index.tsx";

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
      {
        path: "/barbershops",
        element: <BarbershopsPage />,
      },
      {
        path: "/barbershops",
        element: <BarbershopsPage />,
      },
      {
        path: "/bookings",
        element: <BookingsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID ?? ""}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
