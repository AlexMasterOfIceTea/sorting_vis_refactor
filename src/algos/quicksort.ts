import { AlgoDescription, MyAlgo, MyGenerator } from "../interface/types";
import {
	getBaseState,
	isBigger,
	isGreater,
	isGreaterOrEqual,
	isLess,
	isLessOrEqual,
	swap
} from "../utils";

const quicksortRec: (
	array: number[],
	start: number,
	end: number,
	numbersInPlace: number[],
	pivotStrategy: (start: number, end: number) => number
) => MyGenerator = function* (array, start, end, numbersInPlace, pivotStrategy) {
	if (start >= end) {
		numbersInPlace.push(start);
		return;
	}

	//use midpoint as pivot
	let pivotIndex = pivotStrategy(start, end);

	let low = start;
	let high = end;
	while (low <= high) {
		while (yield* isGreater(low, pivotIndex, { array, numbersInPlace })) low++;
		//while (array[low] > pivot) low++;

		while (yield* isLess(high, pivotIndex, { array, numbersInPlace })) high--;
		//while (array[high] < pivot) high--;

		if (low <= high) {
			if (pivotIndex === low) pivotIndex = high;
			else if (pivotIndex === high) pivotIndex = low;

			yield* swap(low, high, { array, numbersInPlace });

			low++;
			high--;
		}
	}

	yield* quicksortRec(array, start, low - 1, numbersInPlace, pivotStrategy);
	yield* quicksortRec(array, low, end, numbersInPlace, pivotStrategy);
};

const algo: MyAlgo = function* (initialArray) {
	const array = [...initialArray];
	yield getBaseState(array);

	yield* quicksortRec(array, 0, initialArray.length - 1, [], (start, end) =>
		Math.floor((start + end) / 2)
	);
};

const description: AlgoDescription = {
	name: "Quick Sort",
	spaceComplexity: "O(1)",
	timeComplexities: {
		best: "O(n log n)",
		average: "θ(n log n)",
		worst: "Ω(n²)"
	}
};

export default {
	algo,
	description
};
