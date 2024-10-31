import { BarberShopItem } from "@/components/barbershop-item";
import { BookingItem } from "@/components/booking-item";
import { Button } from "@/components/ui/button";
import { quickSearchOptions } from "@/constants/search";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";
import { Title } from "@/components/title";
import { Search } from "@/components/search";
import { BarberShop } from "@/models/barbershop-interfaces";
import barberBanner from "../../assets/barber-banner.png";
import { Header } from "@/components/header";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getTokenFromLocalStorage } from "@/lib/getUserFromLocalStorage";
import { BookingDetails } from "../bookings-page";

export function HomePage() {
  const [barberShops, setBarberShops] = useState<BarberShop[]>([]);
  const [confirmedBookings, setConfirmedBookings] = useState<BookingDetails[]>(
    []
  );
  const user = useMemo(() => {
    return getTokenFromLocalStorage();
  }, []);
  const booking = confirmedBookings[0];

  useEffect(() => {
    async function getAllBarbeshop() {
      try {
        const res = await api.get("/barbershop");
        setBarberShops(res.data);
      } catch (error: any) {
        console.log(error);
      }
    }

    getAllBarbeshop();
  }, [barberShops]);

  useEffect(() => {
    async function getConfirmedBookings() {
      try {
        const res = await api.get(`/bookings/confirmed?userId=${user?.sub}`);

        setConfirmedBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getConfirmedBookings();
  }, [user]);

  return (
    <>
      <Header />
      <div className="p-5 md:px-12 lg:px-20 container mx-auto">
        <div className="flex justify-between gap-32 md:my-11">
          <div className="flex flex-col  md:min-w-[310px] lg:min-w-[480px]">
            <h2 className="text-xl font-bold">
              Olá, {user ? user.name : "Seja bem vindo!"}
            </h2>
            <p>
              <span className="capitalize">
                {format(new Date(), "EEEE, dd", { locale: ptBR })}
              </span>
              <span>&nbsp;de&nbsp;</span>
              <span className="capitalize">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </span>
            </p>

            <div className="mt-6">
              <Search />
            </div>

            <div className="hidden md:block">
              {booking && (
                <>
                  <Title name="Agendamentos" />
                  <BookingItem key={booking.id} booking={booking} />
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex overflow-x-hidden lg:flex lg:flex-col">
            <Title name="Populares" />

            <div className="flex">
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
        </div>

        <div className="flex gap-3 my-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden md:hidden">
          {quickSearchOptions.map((option) => (
            <Link to={`barbershops?service=${option.title}`} key={option.title}>
              <Button className="gap-2" variant="secondary">
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

        <div className="mt-6 md:hidden ">
          <img
            src={barberBanner}
            alt="Agende nos melhorescom FSW Barber"
            className="object-cover rounded-xl h-[150px] w-full"
          />
        </div>

        <div className="md:hidden">
          <Title name="Agendamentos" />
        </div>

        {confirmedBookings.length > 0 && (
          <div className="md:hidden">
            <Title name="Agendamentos" />

            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}

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
