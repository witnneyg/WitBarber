import { Header } from "@/components/header";
import { Home } from "./components/home";

export function HomePage() {
  return (
    <div className="container mx-auto ">
      <Header />
      <Home />
    </div>
  );
}
