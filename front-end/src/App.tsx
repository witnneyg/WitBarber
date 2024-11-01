import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
