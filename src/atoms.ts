import { atom } from "jotai";

//mouse
type Pos = readonly [number, number];
export const mousePosAtom = atom<Pos>([0, 0]);
