import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllBarbershop() {
  const allBarberShop = await prisma.barberShop.findMany({
    include: {
      services: true,
    },
  });

  if (!allBarberShop) {
    throw new Error("Nenhuma barbearia encontrada.");
  }

  return allBarberShop;
}

export async function getBarbershopById(id: string) {
  const barberShopById = await prisma.barberShop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  });

  if (!barberShopById) {
    throw new Error("Nenhuma barbearia encontrada.");
  }

  return barberShopById;
}
