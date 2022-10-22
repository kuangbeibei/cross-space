import { FC, useEffect } from "react";
import { IPizza } from "../data/db";
import {
	addByOne,
	minusByOne,
	seletedItems,
	setCountByAmount,
} from "../store/menuSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearLocalStorage, setLocalStorage } from "../utils";
import { StorageConsts } from "../constants";

const MenuItem: FC<{
	item: IPizza;
}> = ({ item }) => {
	const dispatch = useAppDispatch();
	const selected = useAppSelector(seletedItems);

	useEffect(() => {
		if (selected.length) {
			setLocalStorage(StorageConsts.SELECTED_ITEMS, selected);
		}
	}, []);

	useEffect(() => {
		if (selected) {
			setLocalStorage(StorageConsts.SELECTED_ITEMS, selected);
		}
	}, [selected]);

	return (
		<div
			className={`hover:drop-shadow-lg active:drop-shadow-lg hover:scale-105 active:scale-105 transition ease-linear duration-150 min-w-[300px] max-w-sm mx-auto rounded-xl relative overflow-hidden md:max-w-xl shadow-lg shadow-black-500/40 ${
				item.count > 0 ? "bg-cardActiveBg" : "bg-cardBg"
			}`}
		>
			<div className="md:flex">
				<div className="md:shrink-0">
					<img
						className="h-48 w-full object-cover md:h-full md:w-48"
						src={item.picture}
						alt="pizza picture"
					/>
				</div>
				<div className="p-8 min-w-[300px]">
					<div className="flex justify-between">
						<div className="flex flex-col">
							<div className="uppercase tracking-wide text-sm text-slate-600 font-semibold">
								{item.name}
							</div>
							<span className="block mt-1 text-lg leading-tight font-bold text-black">
								{item.desc}
							</span>
							<p className="mt-2 text-slate-500">Add to cart:</p>
							<div className="mt-4 flex gap-2 justify-start">
								<button
									onClick={() => {
										dispatch(
											minusByOne({
												id: item.id,
											})
										);
									}}
									className="w-10 h-10 bg-stone-800 rounded-lg text-white font-sm md:font-lg px-3 py-1 hover:bg-stone-600 active:scale-95"
								>
									-
								</button>
								<input
									value={item.count}
									onChange={(e) => {
										dispatch(
											setCountByAmount({
												id: item.id,
												count: Number(e.target.value),
											})
										);
									}}
									placeholder="0"
									className="w-14 h-10 rounded-md py-1 px-2 outline-none focus:ring-gray-200 focus:ring-2 default:ring-1"
								/>
								<button
									onClick={() =>
										dispatch(
											addByOne({
												id: item.id,
											})
										)
									}
									className="w-10 h-10 bg-stone-800 rounded-lg text-white font-sm md:font-lg px-3 py-1 hover:bg-stone-600 active:scale-95"
								>
									+
								</button>
							</div>
						</div>
						<div
							className={`flex justify-end gap-1 ${
								item.count > 0 ? "text-priceActiveColor" : "text-priceColor"
							}`}
						>
							<div className="font-mono text-2xl">${item.price}</div>
							{item.count > 0 && (
								<div className="font-sans text-sm">x {item.count}</div>
							)}
						</div>
					</div>
				</div>
				<div
					className={`absolute bottom-[-34px] right-[-30px] h-16 w-16 flex flex-start items-start ${
						Number(item.id) < 10 ? "pl-4" : "pl-3"
					} pt-2 transition ease-linear duration-150 font-mono font-semibold text-sm text-white rounded-full ${
						item.count > 0
							? "bg-gradient-to-r from-pink-500 to-violet-500"
							: "bg-gradient-to-r from-cyan-500 to-blue-500"
					}`}
				>
					{item.id}
				</div>
			</div>
		</div>
	);
};

export default MenuItem;
