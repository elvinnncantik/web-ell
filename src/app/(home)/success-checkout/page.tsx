import Navbar from "@/app/components/navbar";
import { getUser } from "@/lib/auth";
import React from "react";
import CheckoutCard from "./components/checkout-card";
import Link from "next/link";

export default async function SuccessPage() {
	const { user } = await getUser();

	return (
		<>
			<section
				id="Header"
				className="bg-[url('/assets/images/background/airplane.png')] bg-no-repeat bg-cover bg-left-top h-[290px] relative"
			>
				<div className="Header-content bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)] h-[290px]">
					<Navbar />
					<div className="w-full h-[15px] bg-gradient-to-t from-[#080318] to-[rgba(8,3,24,0)] absolute bottom-0" />
				</div>
			</section>

			<section
				id="Content"
				className="container max-w-[1130px] mx-auto -mt-[103px] z-10 relative"
			>
				<div className="checkout-container flex justify-center items-center gap-[100px]">
					<CheckoutCard user={user} />
					<div className="flex flex-col gap-[42px] w-fit">
						<h1 className="font-bold text-[32px] leading-[48px]">
							Success Checkout. <br />
							Enjoy Your Best Flight.
						</h1>
						<div className="flex flex-col gap-[14px]">
							<Link
								href="/available-flights"
								className="font-bold text-flysha-black bg-flysha-light-purple rounded-full h-12 w-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] flex justify-center items-center"
							>
								Book More Flights
							</Link>
							<Link
								href="/my-tickets"
								className="font-semibold bg-flysha-black hover:bg-flysha-bg-purple border border-white hover:border-0 rounded-full h-12 w-full transition-all duration-300 flex justify-center items-center"
							>
								View My Tickets
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
