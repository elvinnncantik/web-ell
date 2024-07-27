import prisma from "../../../../../lib/prisma";

export const getMyTickets = async (id: string) => {
	try {
		const data = await prisma.ticket.findMany({
			where: {
				customerId: id,
			},
			select: {
				id: true,
				flight: {
					select: {
						plane: true,
						departureDate: true,
						departureCityCode: true,
						destinationCityCode: true,
						arrivalDate: true,
					},
				},
				seat: {
					select: {
						type: true,
					},
				},
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getDetailTicket = async (id: string) => {
	try {
		const data = await prisma.ticket.findFirst({
			where: {
				id: id,
			},
			include: {
				flight: {
					include: {
						plane: true,
					},
				},
				customer: true,
				seat: true,
			},
		});

		return data;
	} catch (error) {
		console.log(error);

		return null;
	}
};
