import Categories from "@/components/Categories";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/WixClientServer";
import { Suspense, useEffect } from "react";

const HomePage =  () => {
	// const wixClient = useWixClient();

	// useEffect(() => {
	// 	const getProducts = async () => {
	// 		const res = await wixClient.products.queryProducts().find();
	// 		console.log(res);
	// 	};
	// 	getProducts();
	// }, [wixClient]);

	// const wixClient = await wixClientServer();
	// const res = await wixClient.products.queryProducts().find();

	return (
		<div className="">
			<Slider />
			<div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
				<h1 className="text-2xl">Featured Products</h1>
				<Suspense fallback={<Skeleton />}>
					<ProductList
						categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
						limit={4}
					/>
				</Suspense>
			</div>

			<div className="mt-24">
				<h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
					Categories
				</h1>
				<Suspense fallback={<Skeleton />}>
					<Categories />
				</Suspense>
			</div>

			<div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
				<h1 className="text-2xl">New Products</h1>
				{/* <ProductList /> */}
			</div>
		</div>
	);
};

export default HomePage;
