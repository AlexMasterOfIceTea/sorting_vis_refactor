import React, {
	createContext,
	FC,
	memo,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { useEffectNoInitialCall } from "../hooks/useEffectNoInitialCall";
import { MyAlgo, State } from "../interface/types";
import { useControllerContext } from "./controllerContext";

export type ContextValue = {
	algoState: State;
	resetAlgo: (array: number[]) => void;
	step: () => void;
};

// @ts-ignore
export const AlgoContext = createContext<ContextValue>();

export const useAlgoContext = () => useContext(AlgoContext);

export type Props = {
	children: React.ReactNode;
};

export const AgloProvider: FC<Props> = ({ children }) => {
	const {
		initialArray,
		algorithm: { algo },
		millisPerStep,
		paused,
		forwardsTick
	} = useControllerContext();
	const generatorRef = useRef(algo(initialArray));

	const nextValue = useCallback((s: State) => {
		const { done, value } = generatorRef.current.next();
		if (done)
			return {
				done,
				array: s.array
			};
		return value;
	}, []);

	const [algoState, setAlgoState] = useState<State>(() => nextValue({ array: [] }));

	useEffectNoInitialCall(() => {
		step();
	}, [forwardsTick]);

	useEffectNoInitialCall(() => {
		generatorRef.current = algo(initialArray);
		step();
	}, [initialArray]);

	useEffectNoInitialCall(() => {
		generatorRef.current = algo(algoState.array);
		step();
	}, [algo]);

	const resetAlgo = useCallback((array: number[]) => {
		generatorRef.current = algo(array);
		setAlgoState(generatorRef.current.next().value);
	}, []);

	const animationCallback = useCallback(
		(frames: number) => {
			if (algoState?.done) return;
			setAlgoState((s) => {
				if (s?.done) return s;
				let nextState: State;
				do {
					nextState = nextValue(s);
					frames--;
				} while (frames > 0);
				return nextState;
			});
		},
		[algoState?.done]
	);

	const step = useCallback(() => setAlgoState(nextValue), []);

	useAnimationFrame(paused || !!algoState?.done, millisPerStep, animationCallback);

	const value = useMemo(
		() => ({
			step,
			algoState,
			resetAlgo
		}),
		[algoState]
	);

	return <AlgoContext.Provider value={value}>{children}</AlgoContext.Provider>;
};
