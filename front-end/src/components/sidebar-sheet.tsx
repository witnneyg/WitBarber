import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "@/constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { JwtPayload } from "jwt-decode";
import { SignInDialog } from "./sign-in-dialog";
import { getTokenFromLocalStorage } from "@/lib/getUserFromLocalStorage";

export interface CustomJwtPayload extends JwtPayload {
  picture: string;
  email: string;
  name: string;
}

export function SidebarSheet() {
  const [user, setUser] = useState<CustomJwtPayload | undefined>(undefined);

  useEffect(() => {
    const decoded = getTokenFromLocalStorage();

    if (decoded) {
      setUser(decoded);
    } else {
      localStorage.removeItem("token");
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
                <SignInDialog setUser={setUser} />
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

        <Link to="/bookings">
          <Button className="gap-2 justify-start" variant="ghost">
            <CalendarIcon size={18} />
            Agendamentos
          </Button>
        </Link>
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
