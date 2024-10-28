import { BookingItem } from "@/components/booking-item";
import { Header } from "@/components/header";
import { getTokenFromLocalStorage } from "@/lib/getUserFromLocalStorage";
import { api } from "@/services/api";
import { useEffect, useMemo, useState } from "react";

export interface BookingDetails {
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
}

export function BookingsPage() {
  const [confirmedBookings, setConfirmedBookings] = useState<BookingDetails[]>(
    []
  );
  const [concludedBookings, setConcludedBookings] = useState<BookingDetails[]>(
    []
  );
  const user = useMemo(() => {
    return getTokenFromLocalStorage();
  }, []);

  if (!user) {
    // TODO: mostrar pop-up de login
  }

  useEffect(() => {
    async function fetchBookings(
      endpoint: string,
      setState: React.Dispatch<React.SetStateAction<BookingDetails[]>>
    ) {
      try {
        const res = await api.get(`/bookings/${endpoint}?userId=${user?.sub}`);
        setState(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBookings("confirmed", setConfirmedBookings);
    fetchBookings("concluded", setConcludedBookings);
  }, [user?.sub]);

  function handleDeleteBooking(bookingId: string) {
    setConfirmedBookings((prev) =>
      prev.filter((booking) => booking.id !== bookingId)
    );
  }

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                onDelete={handleDeleteBooking}
              />
            ))}
          </>
        )}
        {concludedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
