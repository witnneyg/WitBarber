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
import { useState } from "react";

export function SidebarSheet() {
  const [data] = useState(true); // TODO: make the login and get the user

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex  items-center py-5 border-b border-solid gap-3 justify-between">
        {data ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png"
                style={{ objectFit: "cover" }}
              />
            </Avatar>
            <div>
              <p className="font-bold">Lennzy</p>
              <p className="text-xs">lennzy@gmail.com</p>
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

                <Button variant="outline" className="gap-1 font-bold">
                  <img src="" alt="Google" />
                  Google
                </Button>
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
          <Button
            key={option.title}
            className="gap-2 justify-start"
            variant="ghost"
          >
            <img src={option.imageUrl} alt={option.title} />
            {option.title}
          </Button>
        ))}
      </div>

      <div className="py-5 flex flex-col gap-2">
        <Button variant="ghost" className="justify-start gap-2">
          <LogOutIcon size="18" />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  );
}
