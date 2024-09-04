import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import logo from "../assets/Logo.svg";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { SidebarSheet } from "./sidebar-sheet";

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
            <SidebarSheet />
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
}
