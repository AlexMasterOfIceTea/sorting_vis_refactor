import { AlgoDescription, MyAlgo, MyGenerator, State } from "../interface/types";
import { getBaseState, isLess, swap } from "../utils";

const algo: MyAlgo = function* bubbleGenerator(initialArray: number[]) {
	const n = initialArray.length;
	const array = [...initialArray];
	const numbersInPlace = [];

	yield getBaseState(initialArray);

	for (let i = 0; i < n; i++) {
		let done = true;
		for (let j = 0; j < n - i - 1; j++) {
			if (yield* isLess(j, j + 1, { array, numbersInPlace })) {
				yield* swap(j, j + 1, { array, numbersInPlace });
				done = false;
			}
		}
		numbersInPlace.push(n - i - 1);

		if (done) return;
	}
};

const description: AlgoDescription = {
	name: "Bubble Sort",
	spaceComplexity: "O(1)",
	timeComplexities: {
		best: "O(n)",
		average: "θ(n²)",
		worst: "Ω(n²)"
	}
};

export default {
	algo,
	description
};
