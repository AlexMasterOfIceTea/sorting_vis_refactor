import { FC } from "react";
import { useControllerContext } from "../contexts/controllerContext";
import Slider from "react-slider";
import { getRandomArray } from "../utils";
import bubblesort from "../algos/bubblesort";
import mergesort from "../algos/mergesort";
import bogosort from "../algos/bogosort";
import quicksort from "../algos/quicksort";
import selectionsort from "../algos/selectionsort";
import { Algorithm } from "../interface/types";

export const Footer: FC = () => {
	const { setAlgorithm, setArray, setMillisPerStep, millisPerStep, algorithm, initialArray } =
		useControllerContext();

	const algorithms: Algorithm[] = [bubblesort, mergesort, bogosort, quicksort, selectionsort];
	const complexities = {
		...algorithm.description.timeComplexities,
		space: algorithm.description.spaceComplexity
	};

	return (
		<div className="w-full bg-secondary p-4 flex flex-row gap-x-12 flex-wrap">
			<div className="flex flex-col gap-y-4">
				<div>
					<h3 className="mb-2 text-lg">Array Length</h3>
					<Slider
						min={1}
						max={500}
						value={initialArray.length}
						className="w-40 h-1.5"
						thumbClassName="bg-primary absolute h-4 w-4 z-50 block active:bg-blue-500 rounded-full"
						trackClassName="bg-gray-200 relative h-1.5 rounded-full my-1"
						onChange={(len) => setArray(getRandomArray(len))}
					/>
				</div>

				<div>
					<h3 className="mb-2 text-lg">Sorting Speed</h3>
					{/* Logarithmic scale */}
					<Slider
						min={0}
						max={50}
						value={-Math.log(millisPerStep / 1000) / 0.2}
						className="w-40 h-1.5"
						thumbClassName="bg-primary absolute h-4 w-4 z-50 block active:bg-blue-500 rounded-full"
						trackClassName="bg-gray-200 relative h-1.5 rounded-full my-1"
						onChange={(speed) => {
							setMillisPerStep(1000 * Math.exp(-speed * 0.2));
						}}
					/>
				</div>
			</div>
			<div>
				<h3 className="mb-2 font-bold text-lg">Algorighms</h3>
				<div className="columns-2 max-w-md">
					{algorithms.map((alg) => (
						<div>
							<input
								className="inline active:bg-primary"
								id={`input-for-${alg.description.name}`}
								type="radio"
								name="algoSelector"
								onChange={() => setAlgorithm(alg)}
								checked={algorithm === alg}
							/>
							<label htmlFor={`input-for-${alg.description.name}`}>
								{alg.description.name}
							</label>
						</div>
					))}
				</div>
			</div>
			<div className="font-bold text-lg divide-y text-center divide-black">
				<h3>Time Complexity</h3>
				<div className="flex flex-row gap-x-4 divide-x divide-black">
					<div className="font-normal p-1">
						<h4>Best</h4>
						<p>{complexities.best}</p>
					</div>
					<div className="font-normal p-1">
						<h4>Average</h4>
						<p>{complexities.average}</p>
					</div>
					<div className="font-normal p-1">
						<h4>Worst</h4>
						<p>{complexities.worst}</p>
					</div>
				</div>
			</div>
			<div className="text-lg divide-y divide-black">
				<h3 className="font-bold">Space Complexity</h3>
				<p>{complexities.space}</p>
			</div>
		</div>
	);
};
