import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Search() {
  return (
    <div className="flex w-full items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">
        <SearchIcon size={18} />
      </Button>
    </div>
  );
}
