import { BookingItem } from "@/components/booking-item";
import { Header } from "@/components/header";
import { PhoneItem } from "@/components/phone-item";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import { BookingSummary } from "@/components/booking-summary";
import { toast } from "sonner";
import { CancelBookingDialog } from "@/components/cancel-booking-dialog";
import map from "../../assets/map.png";
import { Skeleton } from "@/components/ui/skeleton";
import { UserContext } from "@/context/user-context";
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
  const { user } = useContext(UserContext);
  const [confirmedBookings, setConfirmedBookings] = useState<BookingDetails[]>(
    []
  );
  const [concludedBookings, setConcludedBookings] = useState<BookingDetails[]>(
    []
  );
  const [bookingInfo, setBookingInfo] = useState<BookingDetails | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }

    if (user?.sub) {
      fetchBookings("confirmed", setConfirmedBookings);
      fetchBookings("concluded", setConcludedBookings);
    }
  }, [user?.sub]);

  const handleCancelBooking = async () => {
    if (!bookingInfo) return;

    try {
      await api.delete(`/bookings/${bookingInfo.id}`);
      toast.success("Reserva cancelada com sucesso!");

      handleDeleteBooking(bookingInfo.id);

      setBookingInfo(() => {
        const newConfirmedBookings = confirmedBookings.filter(
          (booking) => booking.id !== bookingInfo.id
        );

        return newConfirmedBookings.length > 0
          ? newConfirmedBookings[0]
          : undefined;
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cancelar reserva. Tente novamente.");
    }
  };

  function handleDeleteBooking(bookingId: string) {
    setConfirmedBookings((prev) =>
      prev.filter((booking) => booking.id !== bookingId)
    );
  }

  const defaultBookingInfo = bookingInfo || confirmedBookings[0];

  return (
    <>
      <Header />
      <div className="space-y-3 p-5 lg:container lg:mx-auto lg:px-20 mt-2 lg:space-y-4 lg:flex lg:justify-between lg:gap-4">
        <div>
          <h1 className="text-xl font-bold">Agendamentos</h1>
          {confirmedBookings.length === 0 &&
            concludedBookings.length === 0 &&
            !loading && (
              <p className="text-gray-400">Você não tem agendamentos.</p>
            )}
          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Confirmados
              </h2>
              <div className="w-full max-w-lg lg:max-w-[38rem] space-y-4">
                {loading ? (
                  <Skeleton className="w-[38rem] h-[120px]" />
                ) : (
                  confirmedBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      booking={booking}
                      onDelete={handleDeleteBooking}
                      getBookingInfo={() => setBookingInfo(booking)}
                    />
                  ))
                )}
              </div>
            </>
          )}
          {concludedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Finalizados
              </h2>

              <div className="w-full max-w-lg lg:max-w-[38rem] space-y-4">
                {loading ? (
                  <Skeleton className="w-[38rem] h-[120px]" />
                ) : (
                  concludedBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      booking={booking}
                      getBookingInfo={() => setBookingInfo(booking)}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
        {defaultBookingInfo ? (
          <aside className="w-[32rem]">
            <div className="mt-[62px]">
              <Card className="flex flex-col p-5 gap-4">
                <div className="relative flex h-[180px] w-full items-end">
                  <img
                    alt={`Mapa da barbearia ${
                      bookingInfo?.service.barbershop.imageUrl ||
                      confirmedBookings[0].service.barbershop.imageUrl
                    }`}
                    src={map}
                    className="rounded-xl object-cover h-[180px] w-full"
                  />
                  <Card className="absolute z-50 mx-5 mb-3 w-[90%] rounded-xl">
                    <CardContent className="flex items-center gap-3 px-5 py-3">
                      <Avatar>
                        <AvatarImage
                          src={
                            bookingInfo?.service.barbershop.imageUrl ||
                            confirmedBookings[0].service.barbershop.imageUrl
                          }
                        />
                      </Avatar>
                      <div>
                        <h3 className="font-bold">
                          {bookingInfo?.service.name ||
                            confirmedBookings[0].service.name}
                        </h3>
                        <p className="text-xs text-gray-300">
                          {bookingInfo?.service.barbershop.address ||
                            confirmedBookings[0].service.barbershop.address}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <h6 className="uppercase font-semibold text-base">Sobre nós</h6>

                <p className="text-gray-400 text-sm">
                  {bookingInfo?.service.barbershop.description ||
                    confirmedBookings[0].service.barbershop.description}
                </p>

                <div className="border-solid border-y py-4 space-y-2 text-gray-200">
                  {(
                    bookingInfo?.service.barbershop.phones ||
                    confirmedBookings[0].service.barbershop.phones
                  ).map((phone) => (
                    <PhoneItem phone={phone} />
                  ))}
                </div>

                <div className="mb-3 mt-6">
                  <BookingSummary
                    barbershop={
                      bookingInfo?.service.barbershop ||
                      confirmedBookings[0].service.barbershop
                    }
                    service={
                      bookingInfo?.service || confirmedBookings[0].service
                    }
                    selectedDate={
                      bookingInfo?.date || confirmedBookings[0].date
                    }
                  />
                </div>
                {confirmedBookings.some(
                  (booking) =>
                    booking.id === (bookingInfo?.id || confirmedBookings[0].id)
                ) && (
                  <CancelBookingDialog
                    handleCancelBooking={handleCancelBooking}
                  />
                )}
              </Card>
            </div>
          </aside>
        ) : (
          <Skeleton className="w-[32rem] h-[20rem]" />
        )}
      </div>
    </>
  );
}
