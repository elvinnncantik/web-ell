"use client";

import React, { type FC } from "react";
import FlightCard from "../../checkout/components/flight-card";
import type { User } from "lucia";

interface CheckoutCardProps {
	user: User | null;
}

const CheckoutCard: FC<CheckoutCardProps> = ({ user }) => {
	return <FlightCard user={user} />;
};

export default CheckoutCard;
