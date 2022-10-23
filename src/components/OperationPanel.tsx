import { FC } from "react";
import { addByOne, minusByOne, setCountByAmount } from "../store/menuSlice";
import { useAppDispatch } from "../hooks";
import { IPizza } from "../data/db";

const OperationPanel: FC<{ item: IPizza; isOrderPage?: boolean }> = ({
	item,
	isOrderPage,
}) => {
	const dispatch = useAppDispatch();
	return (
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
				className={`w-14 h-10 rounded-md py-1 px-2 outline-none focus:ring-gray-200 focus:ring-2 default:ring-1 ${
					isOrderPage ? "bg-cardActiveBg" : "bg-white"
				}`}
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
	);
};

export default OperationPanel;
