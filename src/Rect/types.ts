import type { Atom, PrimitiveAtom } from "jotai";

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type RectAtom = PrimitiveAtom<Rect>;
