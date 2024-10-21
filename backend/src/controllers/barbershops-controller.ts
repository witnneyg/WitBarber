import { Request, Response, Router } from "express";
import { getBarbershopsSearch } from "../services/barbershops-service";

const router = Router();

interface searchQuery {
  title: string;
  service: string;
}

router.get("/", async (req: Request, res: Response) => {
  const searchQuery = {
    title: req.query.title,
    service: req.query.service,
  };

  if (!searchQuery) {
    return res.status(400).json({ message: "Search query param is required " });
  }

  try {
    const barbershops = await getBarbershopsSearch(
      searchQuery as unknown as searchQuery
    );
    res.status(200).json(barbershops);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
