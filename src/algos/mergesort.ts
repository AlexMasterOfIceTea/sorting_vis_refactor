import { AlgoDescription, MyAlgo, MyGenerator } from "../interface/types";
import { getBaseState } from "../utils";

type sortFun = (arr: number[], start: number, end: number) => MyGenerator;
const sort: sortFun = function* (arr, start, end) {
	if (end - start === 1) return;
	const midpoint = Math.floor((start + end) / 2);

	yield* sort(arr, start, midpoint);
	yield* sort(arr, midpoint, end);
	yield* merge(arr, start, midpoint, end);
};

type mergeFun = (array: number[], start: number, midpoint: number, end: number) => MyGenerator;
const merge: mergeFun = function* (array, start, midpoint, end) {
	let i = start,
		j = midpoint;
	const auxilaryArray = [];
	while (i < midpoint && j < end) {
		yield {
			array,
			comparing: [i, j],
			auxilaryArray,
			auxStartIndex: start
		};
		if (array[i] < array[j]) {
			auxilaryArray.push(array[j]);
			j++;
		} else {
			auxilaryArray.push(array[i]);
			i++;
		}
		//yield { array, auxilaryArray, auxStartIndex: start };
	}
	let n = end - start - auxilaryArray.length;
	while (n--) {
		if (i === midpoint) auxilaryArray.push(array[j++]);
		else auxilaryArray.push(array[i++]);
	}
	//yield { array, auxilaryArray, auxStartIndex: start };

	//merge array with aux array
	auxilaryArray.forEach((val, index) => (array[index + start] = val));
	yield { array, auxilaryArray: [], auxStartIndex: 0 };
};

const algo: MyAlgo = function* (initialArray) {
	const arr = [...initialArray];
	yield getBaseState(arr);
	yield* sort(arr, 0, arr.length);
};

const description: AlgoDescription = {
	name: "Merge Sort",
	spaceComplexity: "O(n)",
	timeComplexities: {
		best: "O(n log n)",
		average: "θ(n log n)",
		worst: "Ω(n log n)"
	}
};

export default {
	algo,
	description
};
