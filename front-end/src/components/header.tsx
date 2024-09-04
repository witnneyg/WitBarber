import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import logo from "../assets/Logo.svg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { quickSearchOptions } from "@/constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <Card>
        <CardContent className="flex py-3 px-5 justify-between items-center">
          <img src={logo} alt="FSW Barber logo" />
          <Sheet>
            <SheetTrigger asChild>
              <Button className="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              <div className="flex items-center py-5 border-b border-solid gap-3">
                <Avatar>
                  <AvatarImage src="" />
                </Avatar>

                <div>
                  <p className="font-bold">Lennzy</p>
                  <p className="text-xs">lennzy@gmail.com</p>
                </div>
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
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
}
