import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { BarberShop, BarberShopServices } from "@/models/barbershop-interfaces";

interface BookingSummaryProps {
  service: Pick<BarberShopServices, "name" | "price">;
  barbershop: Pick<BarberShop, "name">;
  selectedDate: Date;
}

export function BookingSummary({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Data</h2>
          <p className="text-sm">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm">{format(selectedDate, "HH:mm")}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <p className="text-sm">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  );
}
