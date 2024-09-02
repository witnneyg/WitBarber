import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";

export function SearchInput() {
  return (
    <div className="mt-6 flex items-center gap-2">
      <Input placeholder="Faça sua busca..." />
      <Button>
        <SearchIcon />
      </Button>
    </div>
  );
}
