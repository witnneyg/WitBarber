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

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  }, []);

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
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[450px] bg-cover  z-0 md:bg-bgImg filter grayscale" />

        <div className="container mx-auto p-5 md:px-12 lg:px-20 relative z-10">
          <div className="flex justify-between gap-32 md:my-11 ">
            <div className="flex flex-col md:min-w-[310px] lg:min-w-[200px] md:mb-2 w-full">
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
                    <Link to="/bookings">
                      <BookingItem key={booking.id} booking={booking} />
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:flex md:flex-col md:w-[222px] lg:w-full">
              <Title name="Populares" />

              <Carousel
                opts={{
                  align: "start",
                }}
                className="max-w-[460px] flex"
              >
                <CarouselContent className="flex gap-2 w-full ml-1">
                  {barberShops.map(({ name, address, imageUrl, id }) => (
                    <BarberShopItem
                      id={id}
                      key={id}
                      address={address}
                      imageUrl={imageUrl}
                      name={name}
                    />
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <div className="flex gap-3 my-6 md:hidden">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-[860px] flex"
            >
              <CarouselContent className="flex gap-4 w-full ml-1">
                {quickSearchOptions.map((option) => (
                  <Link to={`barbershops?service=${option.title}`}>
                    <Button className="gap-2 w-28" variant="secondary">
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
              </CarouselContent>
              <div className="absolute -bottom-5 left-14">
                <CarouselPrevious />
              </div>
              <div className="absolute -bottom-5 right-14">
                <CarouselNext />
              </div>
            </Carousel>
          </div>

          <div className="mt-11 md:hidden ">
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
              <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {confirmedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}

          <Title name="Recomendados" />
          <div className="flex">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full flex"
            >
              <CarouselContent className="flex gap-2 w-full mx-1">
                {barberShops.map(({ name, address, imageUrl, id }) => (
                  <BarberShopItem
                    id={id}
                    key={id}
                    address={address}
                    imageUrl={imageUrl}
                    name={name}
                  />
                ))}
              </CarouselContent>
              <div className="absolute bottom-[152px] left-16 lg:block md:bottom-[152px] md:left-0">
                <CarouselPrevious />
              </div>
              <div className="absolute bottom-[152px] right-16 lg:block lg:right-0">
                <CarouselNext />
              </div>
            </Carousel>
          </div>

          <Title name="Populares" />
          <div className="flex mb-10">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full flex"
            >
              <CarouselContent className="flex gap-2 w-full mx-2">
                {barberShops.map(({ name, address, imageUrl, id }) => (
                  <BarberShopItem
                    id={id}
                    key={id}
                    address={address}
                    imageUrl={imageUrl}
                    name={name}
                  />
                ))}
              </CarouselContent>
              <div className="absolute bottom-[152px] left-16 lg:block md:bottom-[152px] md:left-0">
                <CarouselPrevious />
              </div>
              <div className="absolute bottom-[152px] right-16 lg:block lg:right-0">
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
