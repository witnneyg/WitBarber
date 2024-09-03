import { BarberShop } from "@/models/barbershop-interfaces";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function BarbershopPage() {
  const [barbershop, setBarbershop] = useState<BarberShop | null>(null);

  const params = useParams();

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
  }, []);

  return <div className="">{barbershop?.name}</div>;
}
