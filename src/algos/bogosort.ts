import { AlgoDescription, MyAlgo, State } from "../interface/types";
import { getBaseState } from "../utils";
import { Algorithm } from "../interface/types";

const shuffleArray: MyAlgo = function* shuffle(arr: number[]) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
		yield {
			array: arr,
			swapping: [i, j]
		};
	}
};

const checkArray: MyAlgo = function* check(arr: number[]) {
	for (let i = 0; i < arr.length - 1; i++) {
		yield {
			array: arr,
			numbersInPlace: [],
			comparing: [i, i + 1]
		};
		if (arr[i] < arr[i + 1]) return false;
	}
	yield {
		array: arr,
		numbersInPlace: arr,
		done: true
	};
	return true;
};

const algo: MyAlgo = function* bogosortGenerator(initialArray: number[]) {
	const arr = [...initialArray];
	yield getBaseState(arr);

	let done = (yield* checkArray(arr)) as boolean;
	while (!done) {
		yield* shuffleArray(arr);
		done = (yield* checkArray(arr)) as boolean;
	}
};

const description: AlgoDescription = {
	name: "Bogo Sort",
	spaceComplexity: "O(1)",
	timeComplexities: {
		best: "O(n)",
		average: "θ(n!)",
		worst: "unbounded"
	}
};

export default {
	algo,
	description
};
