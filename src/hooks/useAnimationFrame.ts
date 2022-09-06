import { useCallback, useEffect, useRef, useState } from "react";

export const useAnimationFrame = (
	paused: boolean,
	millisecondsPerFrame: number,
	callback: (skippedFrames: number) => void
) => {
	//wrap in ref because of closure
	const millisRef = useRef(millisecondsPerFrame);
	useEffect(() => {
		millisRef.current = millisecondsPerFrame;
	}, [millisecondsPerFrame]);

	//Holds the requestAnimationFrame output
	const animationHandle = useRef<number>();

	//time animate was last called
	const lastCallTime = useRef<number | null>(null);

	//remainder after animate was called
	const remainingTime = useRef(0);

	const animate = useCallback(
		(time: number) => {
			if (paused) return;
			if (lastCallTime.current != null) {
				remainingTime.current += time - lastCallTime.current;

				//how many frames were skipped ?
				let frames = Math.floor(remainingTime.current / millisRef.current);
				if (frames) callback(frames);
				remainingTime.current -= frames * millisRef.current;
			}
			lastCallTime.current = time;
			animationHandle.current = requestAnimationFrame(animate);
		},
		[paused]
	);

	//start or pause the animation
	useEffect(() => {
		lastCallTime.current = null;
		//start playing
		if (!paused) {
			animationHandle.current = requestAnimationFrame(animate);
		}

		return () => {
			lastCallTime.current = null;
			cancelAnimationFrame(animationHandle.current as number);
		};
	}, [paused]);
};
