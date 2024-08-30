import { MenuIcon } from "lucide-react";

export function Header() {
  return (
    <div className=" flex justify-between border-b p-4 items-center ">
      <div>FWS BARBER</div>
      <div>
        <MenuIcon />
      </div>
    </div>
  );
}
