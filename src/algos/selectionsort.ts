import { AlgoDescription, MyAlgo } from "../interface/types";
import { getBaseState, isGreater, swap } from "../utils";

const algo: MyAlgo = function* generator(initialArray: number[]) {
	yield getBaseState(initialArray);
	const array = [...initialArray];
	const numbersInPlace = [];

	for (let i = 0; i < initialArray.length; i++) {
		let maxIndex = i;
		for (let j = i + 1; j < initialArray.length; j++) {
			if (yield* isGreater(j, maxIndex, { array, numbersInPlace }))
				yield* swap(maxIndex, j, { array, numbersInPlace });
		}
		numbersInPlace.push(i);
	}
};

const description: AlgoDescription = {
	name: "Selection Sort",
	spaceComplexity: "O(1)",
	timeComplexities: {
		best: "O(n²)",
		average: "θ(n²)",
		worst: "Ω(n²)"
	}
};

export default {
	algo,
	description
};
