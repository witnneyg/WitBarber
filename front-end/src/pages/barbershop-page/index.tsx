import { PhoneItem } from "@/components/phone-item";
import { ServiceItem } from "@/components/service-item";
import { SidebarSheet } from "@/components/sidebar-sheet";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
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
  }, [params.id]);

  return (
    <div>
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

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4 "
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
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

      <div className="p-5 space-y-3 border-b border-solid">
        <h2 className="font-bold uppercase text-gray-400 text-xs">Serviços</h2>
        <div className="space-y-3">
          {barbershop?.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>

      <div className="p-5 space-y-3">
        {barbershop?.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  );
}
