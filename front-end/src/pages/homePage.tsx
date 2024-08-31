import { BarberShopItem } from "@/components/barbershop-item";
import { BookingItem } from "@/components/booking-item";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { quickSearchOptions } from "@/constants/search";
import { SearchIcon } from "lucide-react";

export function HomePage() {
  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Olá, Lennzy!</h2>
      <p>Segunda-feira, 05 de agosto.</p>

      <div className="mt-6 flex items-center gap-2">
        <Input placeholder="Faça sua busca..." />
        <Button>
          <SearchIcon />
        </Button>
      </div>

      <div className="flex gap-3 my-6 overflow-x-scroll [&::webkit-scrollbar]:hidden">
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
          src=""
          alt="Agende nos melhorescom FSW Barber"
          className="object-cover rounded-xl"
        />
      </div>

      <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-3">
        Agendamentos
      </h2>

      <BookingItem />

      <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-3">
        Recomendados
      </h2>

      <div className="flex gap-4 overflow-auto [&::webkit-scrollbar]:hidden">
        <BarberShopItem />
        <BarberShopItem />
        <BarberShopItem />
        <BarberShopItem />
      </div>

      <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-3">
        Populares
      </h2>

      <div className="flex gap-4 overflow-auto [&::webkit-scrollbar]:hidden">
        <BarberShopItem />
        <BarberShopItem />
        <BarberShopItem />
        <BarberShopItem />
      </div>

      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              2024 Copyright <span className="font-bold">FSW</span> Barber
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  );
}
