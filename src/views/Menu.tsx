import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPizza } from "../data/db";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
	getMenuData,
	menuAll,
	selectedFlag,
	setSelectedItems,
} from "../store/menuSlice";
import MenuItem from "../components/MenuItem";
import { shoppingCart } from "../assets";

export default function MenuPage() {
	const pizza = useAppSelector(menuAll);
	const hasSelected = useAppSelector(selectedFlag);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getMenuData());
	}, []);

	return (
		<main className="relative pt-6 pb-6 flex flex-wrap items-center justify-center gap-10 max-w-4/5 mx-auto">
			{pizza.map((item: IPizza) => (
				<MenuItem key={item.id} item={item} />
			))}

			{hasSelected && (
				<div
					className="fixed bottom-12 right-6 border-2 flex justify-center items-center cursor-pointer rounded-full p-1 backdrop-blur-sm bg-white/75 hover:backdrop-blur-lg hover:bg-white/50"
					onClick={() => {
						dispatch(setSelectedItems());
						navigate("/settlement");
					}}
				>
					<div className="absolute top-0 left-0 rounded-full bg-red-500 w-2 h-2 z-10"></div>
					<img
						src={shoppingCart}
						alt=""
						className="md:w-10 md:h-10 w-6 h-6 object-fit transition ease-linear duration-150 scale-90 active:scale-75 hover:scale-85"
					/>
				</div>
			)}
		</main>
	);
}
