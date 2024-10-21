import { PrismaClient } from "@prisma/client";

interface searchQueryProps {
  title?: string;
  service?: string;
}

const prisma = new PrismaClient();

export async function getBarbershopsSearch(searchQuery: searchQueryProps) {
  const barbershopsSearch = await prisma.barberShop.findMany({
    where: {
      OR: [
        searchQuery.title
          ? {
              name: {
                contains: searchQuery.title,
                mode: "insensitive",
              },
            }
          : {},
        searchQuery.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchQuery.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });

  if (!barbershopsSearch) {
    throw new Error("Nenhuma barbearia encontrada!");
  }

  return barbershopsSearch;
}
