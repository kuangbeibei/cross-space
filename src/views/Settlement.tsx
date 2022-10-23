import { useMemo } from "react";
import { IPizza } from "../data/db";
import { useAppDispatch, useAppSelector, useInitAndCheckData } from "../hooks";
import {
	clearSelectedData,
	selectedFlag,
	seletedItems,
} from "../store/menuSlice";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage, getLocalStorage } from "../utils";
import { LazyLoadImg, OperationPanel } from "../components";
import { StorageConsts } from "../constants";

export default function Payment() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { selected } = useInitAndCheckData(true);

	const total = useMemo(
		() =>
			selected.reduce((accu: number, pizza: IPizza) => {
				accu += pizza.count * pizza.price;
				return accu;
			}, 0),
		[selected]
	);

	const handleConfirm = () => {
		navigate("/");
		clearLocalStorage();
		dispatch(clearSelectedData());
	};

	return (
		<div className="overflow-x-hidden relative min-w-[300px] flex flex-col gap-5 justify-between overflow-y-auto pt-12 px-8 pb-8 max-h-screen max-w-lg mx-auto rounded-md shadow-2xl bg-white">
			<div
				className="absolute left-4 top-2 cursor-pointer transition ease-linear duration-150"
				onClick={() => navigate("/")}
			>
				<span className="tracking-wide text-slate-600 font-bold text-lg">
					←
				</span>
			</div>
			{selected.length > 0 &&
				selected.map((item: IPizza) => {
					return (
						<div
							key={item.id}
							className="md:flex md:space-y-4 md:space-x-4 border-b-slate-600 pb-8 border-b-2"
						>
							<div className="relative shadow-md border-slate-150 p-2 rounded-md md:shrink-0">
								<div className="absolute top-[-10px] right-[-15px] text-sm flex items-center justify-center rounded-full w-8 h-8 border-2 font-semibold border-slate-100 bg-slate-50 text-slate-400">
									{item.count}
								</div>
								<LazyLoadImg
									clsName="h-48 w-full object-cover sm:w-48 sm:h-full"
									wrapperCls="h-48 w-full object-cover sm:w-48 sm:h-full"
									picture={item.picture}
								/>
							</div>
							<div className="mt-6 uppercase tracking-wide text-sm text-slate-600 font-semibold self-start">
								<span>{item.name}</span>
								<div className="font-mono text-lg text-priceActiveColor">
									${`${Number(item.price) * Number(item.count)}`}
								</div>
								<OperationPanel item={item} isOrderPage />
							</div>
						</div>
					);
				})}
			<div className="flex justify-between items-center">
				<div className="font-mono text-lg font-semibold text-priceActiveColor">
					Total: <span className="font-bold">${`${total}`}</span>
				</div>
				<button
					className="font-sans bg-bodyBg shadow-sm rounded-md px-6 py-2 transition ease-linear duration-150 hover:scale-95 active:scale-95 hover:bg-priceColor hover:text-slate-250 text-white cursor-pointer"
					onClick={handleConfirm}
					type="button"
				>
					Confirm
				</button>
			</div>
		</div>
	);
}
