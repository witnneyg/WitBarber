import { Request, Response, Router } from "express";
import { createUser } from "../services/user-service";
import jwt from "jsonwebtoken";

const router = Router();

interface CustomJwtPayload {
  name: string;
  email: string;
  sub: string;
}

router.post("/google", async (req: Request, res: Response) => {
  const { token } = req.body;
  const decoded = jwt.decode(token) as CustomJwtPayload;

  if (!decoded) {
    return res.status(400).send({ message: "Invalid token" });
  }

  const user = await createUser(decoded);
  if (!user) {
    return res.status(400).send({ message: "User already exist" });
  }

  res.status(201).json({ user });
});

export default router;
