import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "@/constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { api } from "@/services/api";

export interface CustomJwtPayload extends JwtPayload {
  picture: string;
  email: string;
  name: string;
}

export function SidebarSheet() {
  const [user, setUser] = useState<CustomJwtPayload | undefined>();

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(localStorageToken);
        setUser(decoded);
      } catch (error) {
        console.log("Token inválido ou expirado:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  function handleLogout() {
    setUser(undefined);
    localStorage.removeItem("token");
    googleLogout();
  }

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex  items-center py-5 border-b border-solid gap-3 justify-between">
        {user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.picture} style={{ objectFit: "cover" }} />
            </Avatar>
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="text-xs">{user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google.
                  </DialogDescription>
                </DialogHeader>

                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (!credentialResponse.credential) return;
                      const token = credentialResponse.credential;
                      const decoded = jwtDecode<CustomJwtPayload>(token);

                      api
                        .post(`/auth/google`, { token })
                        .then((response) => {
                          setUser({
                            ...response.data.user,
                            picture: decoded.picture || "",
                          });

                          localStorage.setItem("token", token);
                        })
                        .catch((err) =>
                          console.log(err, "erro ao criar o usuario")
                        );
                    }}
                    onError={() => {
                      alert("Login Failed");
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="py-5 flex flex-col gap-2 border-b border-solid">
        <SheetClose asChild>
          <Link to="/">
            <Button className="gap-2 justify-start" variant="ghost">
              <HomeIcon size={18} />
              Início
            </Button>
          </Link>
        </SheetClose>

        <Button className="gap-2 justify-start" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="py-5 flex flex-col gap-2 border-b border-solid">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Link to={`/barbershops?service=${option.title}`}>
              <Button
                key={option.title}
                className="gap-2 justify-start"
                variant="ghost"
              >
                <img src={option.imageUrl} alt={option.title} />
                {option.title}
              </Button>
            </Link>
          </SheetClose>
        ))}
      </div>

      <div className="py-5 flex flex-col gap-2">
        <Button
          variant="ghost"
          className="justify-start gap-2"
          onClick={() => handleLogout()}
        >
          <LogOutIcon size="18" />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  );
}
