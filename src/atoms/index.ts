import { atom } from "jotai";

export type { InputSocket, OutputSocket } from "../Socket";


//mouse
type Pos = readonly [number, number];
export const mousePosAtom = atom<Pos>([0, 0]);
