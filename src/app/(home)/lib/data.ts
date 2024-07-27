"use server";

import prisma from "../../../../lib/prisma";

export const getCityFilter = async () => {
  try {
    console.log("Connecting to database...");

    const myData = prisma.flight.groupBy({
      by: ["destinationCity", "departureCity"],
    });

    console.log(
      "cek",
      await prisma.flight.groupBy({
        by: ["destinationCity", "departureCity"],
      })
    );

    return await myData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};

// const data = await prisma.flight.groupBy({
//   by: ["departureCity", "destinationCity"],
//   where: {
//     departureDate: {
//       gt: new Date(),
//     },
//   },
//   _count: {
//     departureCity: true,
//     destinationCity: true,
//   },
// })

export const getAirplanes = async () => {
  try {
    const data = await prisma.airplane.findMany({
      where: {
        flight: {
          some: {
            id: { not: undefined },
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching airplanes:", error);
    return [];
  }
};

export const getFlightById = async (id: string) => {
  try {
    const data = await prisma.flight.findFirst({
      where: {
        id: id,
      },
      include: {
        seats: {
          orderBy: {
            seatNumber: "asc",
          },
        },
        plane: true,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching flight by ID:", error);
    return null;
  }
};
