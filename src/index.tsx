import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/*
    Sorting Algos:
        Comparison based:                                               Datastructures          Params      ExtraTypes     
            x Selection Sort	Ω(n^2)	θ(n^2)	O(n^2)	O(1)                    
            x Bubble Sort	Ω(n)	θ(n^2)	O(n^2)	O(1)
            Insertion Sort	Ω(n)	θ(n^2)	O(n^2)	O(1)                                                    Pivot                      
            Heap Sort	Ω(n log(n))	θ(n log(n))	O(n log(n))	O(1)        Heap
            Quick Sort	Ω(n log(n))	θ(n log(n))	O(n^2)	O(n)                                                Pivot
            ~ Merge Sort	Ω(n log(n))	θ(n log(n))	O(n log(n))	O(n)    Aux array
        Others
            Bucket Sort	Ω(n +k)	θ(n +k)	O(n^2)	O(n)                    arr of linked Lists     bucket num
            Radix Sort	Ω(nk)	θ(nk)	O(nk)	O(n + k)                aux counting array      radix
            Count Sort	Ω(n +k)	θ(n +k)	O(n +k)	O(k)
            Shell Sort	Ω(n)	θ(n log(n))	O(n log(n))	O(1)
            Tim Sort	Ω(n)	θ(n log(n))	O(n log (n))	O(n)        aux array
            Tree Sort	Ω(n log(n))	θ(n log(n))	O(n^2)	O(n)            Bin tree
*/

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
