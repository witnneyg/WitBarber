import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>

      <Card>
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit"></Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>
            <div className="flex items-center">
              <Avatar className="h-6 w-6">
                <AvatarImage src="" />
              </Avatar>
              <p className="text-sm">Barbearia FSW</p>
            </div>
          </div>
          <div className="flex fex-col items-center justify-center px-5 border-l-2 border-solid">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">05</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
