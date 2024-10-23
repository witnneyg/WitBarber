import { Request, Response, Router } from "express";
import { createBooking, getBooking } from "../services/booking-service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { serviceId, date } = req.body;

  const booking = await getBooking({ serviceId, date });

  if (!booking) {
    return res.status(400).json({ message: "Nenhuma reserva disponivel" });
  }

  res.status(201).json(booking);
});

router.post("/", async (req: Request, res: Response) => {
  const { serviceId, date } = req.body;
  console.log(date);

  const booking = await createBooking({ serviceId, date });

  res.status(201).json(booking);
});

export default router;
