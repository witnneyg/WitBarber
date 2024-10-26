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
