import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBarbershopsSearch(query: string) {
  const barbershopsSearch = await prisma.barberShop.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  if (!barbershopsSearch) {
    throw new Error("Nenhuma barbearia encontrada!");
  }

  return barbershopsSearch;
}
