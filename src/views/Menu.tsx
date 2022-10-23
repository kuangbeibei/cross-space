import { useNavigate } from "react-router-dom";
import { IPizza } from "../data/db";
import { useAppSelector, useInitAndCheckData } from "../hooks";
import {
	menuAll,
	selectedFlag,
} from "../store/menuSlice";
import { MenuItem } from "../components";
import { shoppingCart } from "../assets";

export default function MenuPage() {
	const pizza = useAppSelector(menuAll);
	const hasSelected = useAppSelector(selectedFlag);
	const navigate = useNavigate();

	useInitAndCheckData()

	return (
		<main className="relative pt-6 pb-6 flex flex-wrap items-center justify-center gap-10 max-w-4/5 mx-auto">
			{pizza.length > 0 &&
				pizza.map((item: IPizza) => <MenuItem key={item.id} item={item} />)}

			{hasSelected && (
				<div
					className="fixed bottom-12 right-6 border-2 flex justify-center items-center cursor-pointer rounded-full p-1 backdrop-blur-sm bg-white/75 hover:backdrop-blur-lg"
					onClick={() => {
						navigate("/settlement");
					}}
				>
					<span className="absolute top-0 left-0 flex h-2 w-2 z-20">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
					</span>
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
