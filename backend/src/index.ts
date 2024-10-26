import express from "express";
import cors from "cors";

import barberRoutes from "./controllers/barber-controller";
import barbershopsRoutes from "./controllers/barbershops-controller";
import bookingRoutes from "./controllers/booking-controller";
import userRoutes from "./controllers/user-controller";

const app = express();
app.use(express.json());
app.use(cors());
const port = 8888;

app.use("/barbershop", barberRoutes);
app.use("/barbershops", barbershopsRoutes);
app.use("/booking", bookingRoutes);
app.use("/auth", userRoutes);

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});
