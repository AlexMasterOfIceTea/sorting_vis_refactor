import { type } from "os";
import { FC } from "react";
import { useAlgoContext } from "../contexts/algoContext";
import { State } from "../interface/types";

type ColorCodeType = Record<Exclude<keyof State, "datastructure" | "done">, string>;

const colorCodes: ColorCodeType = {
	array: "bg-gradient-to-t from-secondary to-teal-300",
	comparing: "bg-red-500",
	swapping: "bg-green-500",
	numbersInPlace: "bg-gradient-to-t from-secondary to-purple-300"
} as const;

export const Visualizer: FC = () => {
	const { algoState } = useAlgoContext();

	if (!algoState) return <></>;

	const { array, comparing, done, numbersInPlace, swapping } = algoState;
	return (
		<div
			className={`mt-16 w-full h-full max-w-screen-lg mx-auto flex flex-row justify-center items-end ${
				array.length < 100 ? "gap-x-[1px]" : ""
			}`}
		>
			{array.map((val, index) => {
				let color = colorCodes.array;
				if (comparing?.includes(index)) color = colorCodes.comparing;
				else if (swapping?.includes(index)) color = colorCodes.swapping;
				else if (done || numbersInPlace?.includes(index)) color = colorCodes.numbersInPlace;

				return <div className={"w-4 " + color} style={{ height: `${val * 3}px` }}></div>;
			})}
		</div>
	);
};
