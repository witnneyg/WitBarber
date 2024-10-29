import { Header } from "@/components/header";
import { PhoneItem } from "@/components/phone-item";
import { ServiceItem } from "@/components/service-item";
import { SidebarSheet } from "@/components/sidebar-sheet";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { BarberShop } from "@/models/barbershop-interfaces";
import { api } from "@/services/api";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import map from "../../assets/map.png";

export function BarbershopPage() {
  const [barbershop, setBarbershop] = useState<BarberShop | null>(null);

  const params = useParams();

  console.log({ barbershop });
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
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="flex gap-5 lg:px-20 lg:mt-10 lg:mx-auto lg:container">
        <div className="lg:w-[800px]">
          <div className="relative h-[250px] w-full lg:hidden">
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

          <img
            src={barbershop?.imageUrl}
            alt={barbershop?.name}
            className="object-cover h-[380px] rounded-2xl hidden lg:block w-full "
          />

          <div className="border-b border-solid p-5 lg:py-5 lg:flex lg:justify-between lg:border-none lg:p-0">
            <div className="w-full">
              <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
              <div className="mb-2 flex items-center gap-2">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm">{barbershop?.address}</p>
              </div>
            </div>

            <div className="mb-2 flex items-center gap-2 lg:flex lg:flex-col">
              <Card className="hidden lg:flex flex-col gap-2 py-3 px-4 items-center w-36">
                <div className="hidden lg:flex gap-2 items-center">
                  <StarIcon className="fill-primary text-primary" size={18} />
                  <span className="hidden lg:block text-lg">5,0</span>
                </div>
                <StarIcon
                  className="fill-primary text-primary lg:hidden"
                  size={18}
                />
                <div className="flex items-center gap-2">
                  <span className="lg:hidden text-sm">5,0</span>
                  <p className="text-sm"> 499 avaliações</p>
                </div>
              </Card>
              <div className="lg:hidden flex gap-2">
                <div className="hidden lg:flex gap-2 items-center">
                  <StarIcon className="fill-primary text-primary" size={18} />
                  <span className="hidden lg:block text-sm">5,0</span>
                </div>
                <StarIcon
                  className="fill-primary text-primary lg:hidden"
                  size={18}
                />
                <div className="flex items-center gap-2">
                  <span className="lg:hidden text-sm">5,0</span>
                  <p className="text-sm"> 499 avaliações</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 lg:py-5 border-b border-solid space-y-2 lg:hidden">
            <h2 className="font-bold uppercase text-gray-400 text-xs">
              Sobre nós
            </h2>
            <p className="text-sm text-justify">{barbershop?.description}</p>
          </div>
          <div className="p-5 space-y-3 border-b border-solid lg:border-none lg:p-0">
            <h2 className="font-bold uppercase text-gray-400 text-xs">
              Serviços
            </h2>
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
          <div className="p-5 space-y-3 lg:py-5 lg:p-0">
            {barbershop?.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
        <aside className="hidden lg:flex flex-col gap-2 w-[400px]">
          {barbershop && (
            <Card className="flex flex-col p-5 gap-4">
              <div className="relative flex h-[180px] w-full items-end">
                <img
                  alt={`Mapa da barbearia ${barbershop.name}`}
                  src={map}
                  className="rounded-xl object-cover h-[180px] w-full"
                />
                <Card className="absolute z-50 mx-5 mb-3 w-[90%] rounded-xl ">
                  <CardContent className="flex items-center gap-3 px-5 py-3">
                    <Avatar>
                      <AvatarImage src={barbershop.imageUrl} />
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{barbershop.name}</h3>
                      <p className="text-xs text-gray-300">
                        {barbershop.address}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <h6 className="uppercase font-semibold text-base">Sobre nós</h6>

              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium voluptatum minus cupiditate facere et atque magnam
                natus consectetur error dolorum possimus, mollitia blanditiis
                asperiores corrupti nisi consequatur veritatis fugit aut maxime,
                minima quibusdam.
              </p>

              <div className="border-solid border-y py-4 space-y-2  text-gray-200">
                {barbershop.phones.map((phone) => (
                  <PhoneItem phone={phone} />
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Segunda</span>
                  <span className="text-xs text-gray-200">Fechado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Terça-feira</span>
                  <span className="text-xs text-gray-200">09:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Quarta-feira</span>
                  <span className="text-xs text-gray-200">09:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Quinta-feira</span>
                  <span className="text-xs text-gray-200">09:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Sexta-feira</span>
                  <span className="text-xs text-gray-200">09:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Sábado</span>
                  <span className="text-xs text-gray-200">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Domingo</span>
                  <span className="text-xs text-gray-200">Fechado</span>
                </div>
              </div>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
