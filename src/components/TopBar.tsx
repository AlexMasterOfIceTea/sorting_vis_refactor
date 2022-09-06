import { FC } from "react";
import { Controller } from "./Controlls";

export const TopBar: FC = ({}) => {
	return (
		<div className="flex flex-col w-full">
			<div className="w-full h-20 bg-primary flex justify-center items-center">
				<h1 className="text-center text-3xl text-white">Sorting Visualizer</h1>
			</div>
			<Controller />
		</div>
	);
};
