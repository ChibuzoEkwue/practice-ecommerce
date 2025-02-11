"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
	const router = useRouter();

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as String;

		if (name) {
			router.push(`/list?name=${name}`);
		}
	};
	return (
		<form
			className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-lg flex-1"
			onSubmit={handleSearch}
		>
			<input
				type="text"
				placeholder="Search"
				className="flex-1 bg-transparent outline-none"
				name="name"
			/>
			<button className="cursor-pointer">
				<Image src="/search.png" alt="" width={16} height={16} />
			</button>
		</form>
	);
};

export default SearchBar;
