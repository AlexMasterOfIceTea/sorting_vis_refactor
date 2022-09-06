import { FC } from "react";
import { BsPlayFill, BsShuffle, BsFillPauseFill } from "react-icons/bs";
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import { useControllerContext } from "../contexts/controllerContext";
import { getRandomArray } from "../utils";

export const Controller: FC = () => {
	const { forwards, togglePause, setArray, paused } = useControllerContext();
	return (
		<div className="mx-auto relative w-[346px]">
			<svg
				width="346"
				height="47"
				viewBox="0 0 346 47"
				className="absolute inset-0 fill-primary"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0 0C-50.0941 0 397.5 0 340.5 0C283.5 0 276.539 47 248.5 47C220.461 47 114.5 47 88.5 47C62.5 47 60.0941 0 0 0Z"
					fill="#4F41F1"
				/>{" "}
			</svg>
			<div className="absolute mx-auto top-0 inset-x-0 w-40 h-7 flex flex-row justify-center gap-x-4">
				{paused ? (
					<BsPlayFill
						className="hover:scale-125 transition-transform duration-200 cursor-pointer"
						size={24}
						onClick={togglePause}
					/>
				) : (
					<BsFillPauseFill
						className="hover:scale-125 transition-transform duration-200 cursor-pointer"
						size={24}
						onClick={togglePause}
					/>
				)}
				<AiFillForward
					className="hover:scale-125 transition-transform duration-200 cursor-pointer"
					size={24}
					onClick={forwards}
				/>
				<BsShuffle
					onClick={() => setArray((arr) => getRandomArray(arr.length))}
					className="hover:scale-125 transition-transform duration-200 cursor-pointer"
					size={24}
				/>
			</div>
		</div>
	);
};
