import type { Airplane, Flight, FlightSeat, TypeSeat } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export type Checkout = {
	id?: string;
	seat?: TypeSeat;
	flightDetail?: Flight & { plane: Airplane };
	seatDetail?: FlightSeat;
};

export const CHECKOUT_KEY = "CHECKOUT_KEY";

export const SEAT_VALUES = {
	ECONOMY: {
		label: "Economy",
		additionalPrice: 0,
	},
	BUSINESS: {
		label: "Business",
		additionalPrice: 500000,
	},
	FIRST: {
		label: "First",
		additionalPrice: 750000,
	},
};

export type SeatValuesType = keyof typeof SEAT_VALUES;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateSeatPerClass = (flightId: string) => {
	const SEAT_CLASS: TypeSeat[] = ["ECONOMY", "BUSINESS", "FIRST"];
	const SEAT_CODE = ["A", "B", "C", "D"];

	const seats: { seatNumber: string; type: TypeSeat; flightId: string }[] =
		[];

	for (const className of SEAT_CLASS) {
		for (const seat of SEAT_CODE) {
			for (let i = 1; i <= 5; i++) {
				seats.push({
					seatNumber: seat + i,
					type: className as TypeSeat,
					flightId,
				});
			}
		}
	}

	return seats;
};

export const dateFormat = (
	date: Date | string,
	format = "DD MMM YYYY HH:mm"
) => {
	if (!date) {
		return "";
	}

	const dateformat = dayjs(date).format(format);

	return dateformat;
};

export const rupiahFormat = (value: number) => {
	return Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(value);
};

export const objectToParams = (obj: { [key: string]: unknown }) => {
	const queryParams = Object.keys(obj)
		.map((key) => {
			if (obj[key] !== null) {
				return `${key}=${obj[key]}`;
			}

			return "";
		})
		.filter((key) => key !== "")
		.join("&");

	return queryParams;
};

export const mappingSeats = (seats: FlightSeat[]) => {
	const totalSeatEconomy = seats.filter(
		(item) => item.type === "ECONOMY"
	).length;
	const totalSeatBusiness = seats.filter(
		(item) => item.type === "BUSINESS"
	).length;
	const totalSeatFirst = seats.filter((item) => item.type === "FIRST").length;

	const economy = seats.filter(
		(item) => item.type === "ECONOMY" && item.isBooked
	).length;
	const business = seats.filter(
		(item) => item.type === "BUSINESS" && item.isBooked
	).length;
	const first = seats.filter(
		(item) => item.type === "FIRST" && item.isBooked
	).length;

	return {
		economy,
		business,
		first,

		totalSeatEconomy,
		totalSeatBusiness,
		totalSeatFirst,
	};
};

export function makeid(length: number) {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
		counter += 1;
	}
	return result;
}
