import { HomePage } from "./pages/home-page/index.tsx";
import App from "./App.tsx";
import { BarbershopPage } from "./pages/barbershop-page/index.tsx";
import { BarbershopsPage } from "./pages/barbershops-page/index.tsx";
import { BookingsPage } from "./pages/bookings-page/index.tsx";

export const routes = [
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
];
