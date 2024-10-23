import { PrismaClient } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";

const prisma = new PrismaClient();

interface BookingProps {
  serviceId: string;
  date: Date;
}

export function getBooking({ date }: BookingProps) {
  return prisma.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
}

export function createBooking(params: BookingProps) {
  return prisma.booking.create({
    data: {
      ...params,
      userId: "hard-code",
    },
  });
}
