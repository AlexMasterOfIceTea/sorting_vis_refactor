import { useEffect, useRef } from "react";

export const useEffectNoInitialCall = (
	effect: React.EffectCallback,
	deps?: React.DependencyList | undefined
) => {
	const first = useRef(true);
	useEffect(() => {
		if (first.current) first.current = false;
		else return effect();
	}, deps);
};
