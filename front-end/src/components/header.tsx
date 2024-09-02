import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import logo from "../assets/Logo.svg";

export function Header() {
  return (
    <header>
      <Card>
        <CardContent className="flex py-3 px-5 justify-between items-center">
          <img src={logo} alt="FSW Barber logo" />
          <nav>
            <Button className="icon" variant="outline">
              <MenuIcon />
            </Button>
          </nav>
        </CardContent>
      </Card>
    </header>
  );
}
