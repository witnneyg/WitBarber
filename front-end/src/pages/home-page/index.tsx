import { BarberShopItem } from "@/components/barbershop-item";
import { BookingItem } from "@/components/booking-item";
import { Button } from "@/components/ui/button";
import { quickSearchOptions } from "@/constants/search";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Title } from "@/components/title";
import { Search } from "@/components/search";
import { BarberShop } from "@/models/barbershop-interfaces";
import barberBanner from "../../assets/barber-banner.png";
import { Header } from "@/components/header";
import { Link } from "react-router-dom";

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
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Lennzy!</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="flex gap-3 my-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Link to={`barbershops?service=${option.title}`}>
              <Button className="gap-2" variant="secondary" key={option.title}>
                <img
                  src={option.imageUrl}
                  alt="Cabelo icon"
                  width={16}
                  height={16}
                />
                {option.title}
              </Button>
            </Link>
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
          {barberShops.map(({ name, address, imageUrl, id }) => (
            <BarberShopItem
              id={id}
              key={id}
              address={address}
              imageUrl={imageUrl}
              name={name}
            />
          ))}
        </div>

        <Title name="Populares" />

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden mb-10">
          {barberShops.map(({ name, address, imageUrl, id }) => (
            <BarberShopItem
              id={id}
              key={id}
              address={address}
              imageUrl={imageUrl}
              name={name}
            />
          ))}
        </div>
      </div>
    </>
  );
}
