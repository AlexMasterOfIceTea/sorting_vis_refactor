import React from "react";

export type MyGenerator = Generator<State, any, State>;
export type MyAlgo = (initialArray: number[]) => MyGenerator;
export type Algorithm = {
	algo: MyAlgo;
	description: AlgoDescription;
};

export interface State {
	array: number[];

	//i1 and i2 are the index of numbers that where compared in the last step
	comparing?: [i: number, j: number];

	swapping?: [i: number, j: number];

	done?: boolean;
	numbersInPlace?: number[];
}

export type AlgoDescription = {
	name: string;
	timeComplexities: {
		best: React.ReactNode;
		average: React.ReactNode;
		worst: React.ReactNode;
	};
	spaceComplexity: React.ReactNode;
	description?: string;
};
