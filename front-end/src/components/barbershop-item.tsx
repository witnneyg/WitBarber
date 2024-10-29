import { StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

interface BarberShopItemProps {
  id: string;
  name: string;
  imageUrl: string;
  address: string;
}

export function BarberShopItem({
  name,
  imageUrl,
  address,
  id,
}: BarberShopItemProps) {
  return (
    <Card className="min-w-[167px] rounded-2xl  md:min-w-[220px]">
      <CardContent className="p-0 px-1 pt-1 pb-2">
        <div className="relative h-[159px] w-full">
          <img src={imageUrl} alt={name} className="bg-cover rounded-2xl" />

          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        <div className="py-3 px-1">
          <h3 className="font-semibold truncate">{name}</h3>
          <p className="text-sm text-gray-400 truncate">{address}</p>
          <Link to={`/barbershop/${id}`}>
            <Button variant={"secondary"} className="mt-3 w-full">
              Reservar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
