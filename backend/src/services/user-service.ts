import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserParams {
  name: string;
  email: string;
  sub: string;
}

export async function createUser({ name, email, sub }: UserParams) {
  let user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: sub,
        email,
        name,
      },
    });
  }

  return user;
}
