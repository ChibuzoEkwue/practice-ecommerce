"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";

const NavIcons = () => {
	const wixClient = useWixClient();

	const router = useRouter();

	const isLoggedIn = wixClient.auth.loggedIn();

	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleShowProfile = () => {
		if (!isLoggedIn) {
			router.push("/login");
		} else {
			setIsProfileOpen((prev) => !prev);
		}
	};

	const handleLogout = async () => {
		setIsLoading(true);
		Cookies.remove("refreshToken");
		const { logoutUrl } = await wixClient.auth.logout(window.location.href);
		setIsLoading(false);
		setIsProfileOpen(false);
		router.push(logoutUrl);
	};

	return (
		<div className="flex items-center gap-4 xl:gap-6 relative">
			<Image
				src="/profile.png"
				alt=""
				width={22}
				height={22}
				className="cursor-pointer"
				onClick={handleShowProfile}
			/>
			{isProfileOpen && (
				<div className="absolute p-4 bg-white rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 ">
					<Link href="/profile">Profile</Link>
					<div className="mt-2 cursor-pointer" onClick={handleLogout}>
						{isLoading ? "Logging out" : "Logout"}
					</div>
				</div>
			)}
			<Image
				src="/notification.png"
				alt=""
				width={22}
				height={22}
				className="cursor-pointer"
			/>
			<div
				className="relative cursor-pointer"
				onClick={() => setIsCartOpen((prev) => !prev)}
			>
				<Image
					src="/cart.png"
					alt=""
					width={22}
					height={22}
					className="cursor-pointer"
				/>
				<div className="absolute -top-4 -right-4 size-6 bg-chibuzo rounded-full text-white text-sm flex items-center justify-center">
					2
				</div>
				{isCartOpen && <CartModal />}
			</div>
		</div>
	);
};

export default NavIcons;
