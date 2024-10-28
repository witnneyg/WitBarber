import { PrismaClient } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";

const prisma = new PrismaClient();

interface CreateBookingProps {
  serviceId: string;
  date: Date;
  userId: string;
}
interface GetBookingProps {
  serviceId: string;
  date: Date;
}

export async function getBooking({ date }: GetBookingProps) {
  return await prisma.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
}

export async function createBooking(params: CreateBookingProps) {
  return await prisma.booking.create({
    data: {
      ...params,
      userId: params.userId,
    },
  });
}

export async function getConcludedBookings(userId: string) {
  if (!userId) return [];

  return await prisma.booking.findMany({
    where: {
      userId: userId,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
}
export async function getConfirmedBookings(userId: string) {
  if (!userId) return [];

  return prisma.booking.findMany({
    where: {
      userId: userId,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
}

export async function deleteBookings(bookingId: string) {
  return await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
}
