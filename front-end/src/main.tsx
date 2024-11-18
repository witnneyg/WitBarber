import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes.tsx";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/user-context.tsx";

import "./index.css";

document.documentElement.classList.add("dark");

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID ?? ""}>
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </UserProvider>
  </StrictMode>
);
