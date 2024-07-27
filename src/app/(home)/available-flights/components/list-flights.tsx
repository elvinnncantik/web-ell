"use client";

import Image from "next/image";
import React, { useContext } from "react";
import FlightItem from "./flight-item";
import { type FContext, FlightContext } from "../providers/flight-provider";
import LoadingListFlight from "./loading-list-flights";

export default function ListFlights() {
	const { flights, isLoading } = useContext(FlightContext) as FContext;

	if (isLoading) {
		return <LoadingListFlight />;
	}

	return (
		<div className="ticket-container flex flex-col w-full gap-6">
			{flights?.map((val) => (
				<FlightItem data={val} key={val.id} />
			))}
			<p className="text-center text-sm text-[#A0A0AC] h-fit">
				You’ve reached the end of results.
			</p>
		</div>
	);
}
