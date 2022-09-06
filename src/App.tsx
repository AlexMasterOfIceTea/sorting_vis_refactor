import React, { FC, memo, useRef } from "react";
import bubbleSort from "./algos/bubblesort";
import { Footer } from "./components/Footer";
import { TopBar } from "./components/TopBar";
import { Visualizer } from "./components/Visualizer";
import { AgloProvider } from "./contexts/algoContext";
import { ControllerContext, ControllerProvider } from "./contexts/controllerContext";
import { getBaseState, getRandomArray } from "./utils";

const Content: FC = () => (
	<div className="bg-slate-100 flex flex-col h-screen">
		<TopBar />
		<Visualizer />
		<Footer />
	</div>
);
const MemorizedContent = memo(Content);

function App() {
	return (
		<ControllerProvider>
			<AgloProvider>
				<MemorizedContent />
			</AgloProvider>
		</ControllerProvider>
	);
}

export default App;
