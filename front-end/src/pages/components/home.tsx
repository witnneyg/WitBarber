import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";

export function Home() {
  return (
    <div className="flex flex-col mt-6 gap-5 ">
      <div>
        <h1 >
          Olá, <span>Miguel!</span>
        </h1>
        <span>Sexta, 2 de Fevereiro</span>
      </div>
      <div className="">
        <Search />
      </div>
      <div className="flex gap-5">
        <div className="flex gap-2 items-center">
          <Button>
            <Clipboard />
            Cabelo
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button>
            <Clipboard />
            Barba
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button>
            <Clipboard />
            Acabamento
          </Button>
        </div>
      </div>
    </div>
  );
}
