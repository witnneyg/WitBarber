import { CustomJwtPayload } from "@/components/sidebar-sheet";
import { jwtDecode } from "jwt-decode";

export function getTokenFromLocalStorage() {
  const localStorageToken = localStorage.getItem("token");

  if (!localStorageToken) return;
  const decoded = jwtDecode<CustomJwtPayload>(localStorageToken);

  return decoded;
}
