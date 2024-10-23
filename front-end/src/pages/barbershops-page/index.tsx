import { BarberShopItem } from "@/components/barbershop-item";
import { Header } from "@/components/header";
import { Search } from "@/components/search";
import { api } from "@/services/api";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface searchParams {
  title: string | undefined;
  service: string | undefined;
}

interface BarberShopItemProps {
  id: string;
  name: string;
  imageUrl: string;
  address: string;
}

export function BarbershopsPage() {
  const [barbershops, setBarbershops] = useState<BarberShopItemProps[]>();
  const [searchParams] = useSearchParams();

  const searchQuery: searchParams = useMemo(
    () => ({
      title: searchParams.get("title") || undefined,
      service: searchParams.get("service") || undefined,
    }),
    [searchParams]
  );

  console.log({ searchQuery });

  useEffect(() => {
    async function getBarbershopSearch() {
      try {
        const res = await api.get(`/barbershops`, {
          params: {
            title: searchQuery.title,
            service: searchQuery.service,
          },
        });
        setBarbershops(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getBarbershopSearch();
  }, [searchQuery]);

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;
          {searchQuery?.title || searchQuery?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops &&
            barbershops!.map((barbershop) => (
              <BarberShopItem
                id={barbershop.id}
                key={barbershop.id}
                name={barbershop.name}
                address={barbershop.address}
                imageUrl={barbershop.imageUrl}
              />
            ))}
        </div>
      </div>
    </div>
  );
}