import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
