import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

      <div className="relative h-[150px] w-full mt-6 ">
        <img
          src=""
          alt="Agende nos melhorescom FSW Barber"
          className="object-cover rounded-xl"
        />
        {/* fill */}
      </div>
    </div>
  );
}
