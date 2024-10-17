import { Header } from "@/components/header";
import { Search } from "@/components/search";
import { useSearchParams } from "react-router-dom";

interface searchParams {
  title: string | undefined;
  service: string | undefined;
}

export function BarbershopsPage() {
  const [searchParams] = useSearchParams();

  console.log({ searchParams });

  const searchQuery: searchParams = {
    title: searchParams.get("title") || undefined,
    service: searchParams.get("service") || undefined,
  };

  console.log({ searchQuery });

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
          {/* {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))} */}
        </div>
      </div>
    </div>
  );
}
