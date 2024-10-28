import { Request, Response, Router } from "express";
import {
  createBooking,
  deleteBookings,
  getBooking,
  getConcludedBookings,
  getConfirmedBookings,
} from "../services/bookings-service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { serviceId, date } = req.query as any;

  try {
    const booking = await getBooking({ serviceId, date });

    if (!booking) {
      return res.status(400).json({ message: "Nenhuma reserva disponivel" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: "Aconteceu algo de errado!" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { serviceId, date, userId } = req.body;

  try {
    const booking = await createBooking({ serviceId, date, userId });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: "Aconteceu algo de errado!" });
  }
});

router.get("/confirmed", async (req: Request, res: Response) => {
  const { userId } = req.query as any;

  try {
    const booking = await getConfirmedBookings(userId);

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: "Aconteceu algo de errado!" });
  }
});

router.get("/concluded", async (req: Request, res: Response) => {
  const { userId } = req.query as any;

  try {
    const booking = await getConcludedBookings(userId);

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: "Aconteceu algo de errado!" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const bookingId = req.params.id;

  try {
    const booking = await deleteBookings(bookingId);

    console.log({ booking });

    if (!booking) {
      res.status(404).json({ message: "Reserva não encontrada." });
    }

    res.status(200).json({ message: "Reserva deletada com sucesso.", booking });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar reserva." });
  }
});

export default router;
