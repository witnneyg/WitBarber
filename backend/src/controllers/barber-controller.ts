import { Request, Response, Router } from "express";
import {
  getAllBarbershop,
  getBarbershopById,
} from "../services/barbershop-service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const barber = await getAllBarbershop();

    res.status(200).send(barber);
  } catch (error: any) {
    if (error.message) {
      return res.status(404).json({ error: "Nenhnuma barbearia encontrada." });
    }
    res.status(500).json({
      error: "Erro interno do servidor. Por favor, tente novamente mais tarde.",
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const barberId = req.params.id;
    const barber = await getBarbershopById(barberId);

    res.status(200).json(barber);
  } catch (error: any) {
    if (error.message) {
      return res.status(404).json({ error: "Nenhnuma barbearia encontrada." });
    }
    res.status(500).json({
      error: "Erro interno do servidor. Por favor, tente novamente mais tarde.",
    });
  }
});

export default router;
