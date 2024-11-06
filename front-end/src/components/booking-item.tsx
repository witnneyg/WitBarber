import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { format, isFuture } from "date-fns";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ptBR } from "date-fns/locale";
import { BookingSummary } from "./booking-summary";
import { PhoneItem } from "./phone-item";
import { Button } from "./ui/button";

import map from "../assets/map.png";
import { api } from "@/services/api";
import { BookingDetails } from "@/pages/bookings-page";
import { CancelBookingDialog } from "./cancel-booking-dialog";

export interface BookingItemProps {
  booking: {
    id: string;
    userId: string;
    serviceId: string;
    date: Date;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      email: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    service: {
      id: string;
      name: string;
      description: string;
      imageUrl: string;
      price: number;
      barbershopId: string;
      barbershop: {
        id: string;
        name: string;
        address: string;
        phones: string[];
        description: string;
        imageUrl: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
}

export interface BookingItemDeleteProps {
  onDelete?: (bookingId: string) => void;
}

export interface getBookingInfo {
  getBookingInfo?: (booking: BookingDetails[]) => void;
}

export function BookingItem({
  booking,
  onDelete,
  getBookingInfo,
}: BookingItemProps & BookingItemDeleteProps & getBookingInfo) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    service: { barbershop },
  } = booking;
  const isConfirmed = isFuture(booking.date);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const handleCancelBooking = async () => {
    try {
      await api.delete(`/bookings/${booking.id}`);
      setIsSheetOpen(false);
      toast.success("Reserva cancelada com sucesso!");

      if (onDelete) {
        onDelete(booking.id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cancelar reserva. Tente novamente.");
    }
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    if (isLargeScreen && getBookingInfo) {
      getBookingInfo(booking as any);
      setIsSheetOpen(false);
      return;
    }
    setIsSheetOpen(isOpen);
  };

  const checkScreenSize = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setIsLargeScreen(true);
    } else {
      setIsLargeScreen(false);
    }
  };

  useEffect(() => {
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      setIsSheetOpen(false);
    }
  }, [isLargeScreen]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5 text-left">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%] overflow-y-auto ">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <img
            alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
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
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <div className="mb-3 mt-6">
            <BookingSummary
              barbershop={barbershop}
              service={booking.service}
              selectedDate={booking.date}
            />
          </div>

          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <CancelBookingDialog handleCancelBooking={handleCancelBooking} />
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
