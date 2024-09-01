import express from "express";

import barberRoutes from "./controllers/barber-controller";

const app = express();

app.use(express.json());

const port = 8888;

app.use("/", barberRoutes);

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});
