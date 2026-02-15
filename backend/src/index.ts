import express from "express";
import cors from "cors";

import barberRoutes from "./controllers/barber-controller";
import barbershopsRoutes from "./controllers/barbershops-controller";
import bookingsRoutes from "./controllers/bookings-controller";
import userRoutes from "./controllers/user-controller";

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8888;

app.use("/barbershop", barberRoutes);
app.use("/barbershops", barbershopsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/auth", userRoutes);

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});
