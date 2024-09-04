import { Button } from "@/components/ui/button";
import { BarberShop } from "@/models/barbershop-interfaces";
import { api } from "@/services/api";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function BarbershopPage() {
  const [barbershop, setBarbershop] = useState<BarberShop | null>(null);

  const params = useParams();

  useEffect(() => {
    async function getBarbershopById() {
      try {
        const res = await api.get(`/barbershop/${params.id}`);

        setBarbershop(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getBarbershopById();
  }, []);

  return (
    <div className="mt-14">
      <div className="relative h-[250px] w-full">
        <img
          src={barbershop?.imageUrl}
          alt={barbershop?.name}
          className="object-cover w-full h-full"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
        >
          <Link to="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="mb-2 flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      <div className="p-5 border-b border-solid space-y-2">
        <h2 className="font-bold uppercase text-gray-400 text-xs">Sobre nós</h2>
        <p className="text-sm text-justify">{barbershop?.description}</p>
      </div>
    </div>
  );
}
