import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function Header() {
  return (
    <Card>
      <CardContent className="flex justify-between items-start">
        <img src="" alt="FSW Barber logo" height={18} width={120} />
        <Button className="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
