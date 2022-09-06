import { stat } from "fs";
import { State } from "./interface/types";

//random Array with integer values between 10 and 99
export const getRandomArray = (len: number) =>
	[...new Array(len)].map(() => Math.floor(10 + Math.random() * 90));

export const getBaseState: (arr: number[]) => State = (array) => ({
	array,
	done: false,
	numbersInPlace: []
});

/*
export const swap = (arr: number[], i: number, j: number) => {
	const temp = arr[j];
	arr[j] = arr[i];
	arr[i] = temp;
};
*/

export function* swap<T extends State>(i: number, j: number, state: T) {
	const temp = state.array[j];
	state.array[j] = state.array[i];
	state.array[i] = temp;
	yield {
		...state,
		swapping: [i, j]
	} as T;
}

function* compare<T extends State>(
	i: number,
	j: number,
	predicate: (a: number, b: number) => boolean,
	state: T
) {
	yield {
		...state,
		comparing: [i, j]
	} as T;
	return predicate(state.array[i], state.array[j]);
}

export function* isLess<T extends State>(i: number, j: number, state: T) {
	return yield* compare(i, j, (a, b) => a < b, state);
}

export function* isGreater<T extends State>(i: number, j: number, state: T) {
	return yield* compare(i, j, (a, b) => a > b, state);
}

export function* isLessOrEqual<T extends State>(i: number, j: number, state: T) {
	return yield* compare(i, j, (a, b) => a <= b, state);
}

export function* isGreaterOrEqual<T extends State>(i: number, j: number, state: T) {
	return yield* compare(i, j, (a, b) => a >= b, state);
}

export function* isBigger<T extends State>(i: number, j: number, state: T) {
	yield {
		...state,
		comparing: [i, j]
	} as T;
	return state.array[i] > state.array[j];
}
