import React, {
	createContext,
	FC,
	memo,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState
} from "react";
import bubbleSort from "../algos/bubblesort";
import mergeSort from "../algos/mergesort";
import bogoSort from "../algos/bogosort";

import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { Algorithm, MyAlgo, State } from "../interface/types";
import { getBaseState, getRandomArray } from "../utils";

export type ContextValue = {
	paused: boolean;
	togglePause: () => void;
	millisPerStep: number;
	setMillisPerStep: React.Dispatch<React.SetStateAction<number>>;
	initialArray: number[];
	setArray: React.Dispatch<React.SetStateAction<number[]>>;
	algorithm: Algorithm;
	setAlgorithm: React.Dispatch<React.SetStateAction<Algorithm>>;
	forwardsTick: boolean;
	forwards: () => void;
};

// @ts-ignore
export const ControllerContext = createContext<ContextValue>();

export const useControllerContext = () => useContext(ControllerContext);

export type Props = {
	children: React.ReactNode;
};

export const ControllerProvider: FC<Props> = ({ children }) => {
	const [millisPerStep, setMillisPerStep] = useState(100);
	const [initialArray, setArray] = useState(getRandomArray(20));
	const [algorithm, setAlgorithm] = useState(bubbleSort);
	const [paused, setPaused] = useState(true);
	const [forwardsTick, setForwardsTick] = useState(true);

	const togglePause = useCallback(() => {
		setPaused((p) => !p);
	}, []);

	const forwards = useCallback(() => {
		setPaused(true);
		setForwardsTick((f) => !f);
	}, []);

	const value = useMemo(
		() => ({
			millisPerStep,
			initialArray,
			algorithm,
			paused,
			setMillisPerStep,
			setArray,
			setAlgorithm,
			togglePause,
			forwardsTick,
			forwards
		}),
		[millisPerStep, initialArray, algorithm, paused, forwardsTick]
	);

	return <ControllerContext.Provider value={value as any}>{children}</ControllerContext.Provider>;
};
