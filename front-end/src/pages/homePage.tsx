import { BarberShopItem } from "@/components/barbershop-item";
import { BookingItem } from "@/components/booking-item";
import { Button } from "@/components/ui/button";

import { quickSearchOptions } from "@/constants/search";

import barberBanner from "../assets/barber-banner.png";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Title } from "@/components/title";
import { SearchInput } from "@/components/search";

interface Booking {
  id: string;
  date: Date;
}

interface BarberShopServices {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  bookings: Booking[];
}
interface BarberShop {
  id: string;
  name: string;
  address: string;
  phones: string[];
  description: string;
  imageUrl: string;
  services: BarberShopServices[];
}

export function HomePage() {
  const [barberShops, setBarberShops] = useState<BarberShop[]>([]);

  useEffect(() => {
    async function getAllBarbeshop() {
      try {
        const res = await api.get("/barbershop");
        setBarberShops(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    getAllBarbeshop();
  }, [barberShops]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Olá, Lennzy!</h2>
      <p>Segunda-feira, 05 de agosto.</p>

      <SearchInput />

      <div className="flex gap-3 my-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => (
          <Button className="gap-2" variant="secondary" key={option.title}>
            <img
              src={option.imageUrl}
              alt="Cabelo icon"
              width={16}
              height={16}
            />
            {option.title}
          </Button>
        ))}
      </div>

      <div className="relative h-[150px] w-full mt-6 ">
        <img
          src={barberBanner}
          alt="Agende nos melhorescom FSW Barber"
          className="object-cover rounded-xl"
        />
      </div>

      <Title name="Agendamentos" />

      <BookingItem />

      <Title name="Recomendados" />

      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {barberShops.map(({ name, address, imageUrl }) => (
          <BarberShopItem address={address} imageUrl={imageUrl} name={name} />
        ))}
      </div>

      <Title name="Populares" />

      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden mb-10">
        {barberShops.map(({ name, address, imageUrl, id }) => (
          <BarberShopItem
            address={address}
            imageUrl={imageUrl}
            name={name}
            key={id}
          />
        ))}
      </div>
    </div>
  );
}
