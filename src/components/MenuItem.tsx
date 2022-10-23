import { FC, useEffect } from "react";
import { IPizza } from "../data/db";
import { seletedItems } from "../store/menuSlice";
import { useAppSelector } from "../hooks";
import { setLocalStorage } from "../utils";
import { StorageConsts } from "../constants";
import { LazyLoadImg, OperationPanel } from "../components";

const MenuItem: FC<{
	item: IPizza;
}> = ({ item }) => {
	
	return (
		<div
			className={`hover:drop-shadow-lg active:drop-shadow-lg hover:scale-105 active:scale-105 transition ease-linear duration-150 min-w-[300px] max-w-sm mx-auto rounded-xl relative overflow-hidden md:max-w-xl shadow-lg shadow-black-500/40 ${
				item.count > 0 ? "bg-cardActiveBg" : "bg-cardBg"
			}`}
		>
			<div className="md:flex">
				<div className="md:shrink-0">
					<LazyLoadImg
						picture={item.picture}
						wrapperCls="md:w-48 object-cover h-48 w-full md:h-full"
						clsName="gallery-img md:h-full object-cover"
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
							<OperationPanel item={item} />
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
