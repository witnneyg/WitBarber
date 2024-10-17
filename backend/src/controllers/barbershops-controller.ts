import { Request, Response, Router } from "express";
import { getBarbershopsSearch } from "../services/barbershops-service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query param is required " });
  }

  const barbershops = await getBarbershopsSearch(query as string);

  res.status(200).json(barbershops);
});

export default router;
