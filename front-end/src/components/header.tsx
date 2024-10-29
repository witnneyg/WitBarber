import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import logo from "../assets/Logo.svg";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { SidebarSheet } from "./sidebar-sheet";
import { Link } from "react-router-dom";
import { Search } from "./search";

export function Header() {
  return (
    <header>
      <Card>
        <CardContent className="flex py-3 px-5 justify-between items-center md:px-12 lg:px-20">
          <Link to="/">
            <img src={logo} alt="FSW Barber logo" />
          </Link>
          <div className="hidden md:block md:w-[340px] lg:w-[600px]">
            <Search />
          </div>
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
