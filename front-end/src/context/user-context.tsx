import { jwtDecode, JwtPayload } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface CustomJwtPayload extends JwtPayload {
  picture: string;
  email: string;
  name: string;
}

interface UserContextProps {
  user: CustomJwtPayload | undefined;
  setUser: React.Dispatch<React.SetStateAction<CustomJwtPayload | undefined>>;
}

export const UserContext = createContext<UserContextProps>({
  user: undefined,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomJwtPayload | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setUser(decoded);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
