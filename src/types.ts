import type { Atom, PrimitiveAtom } from "jotai";
export type Position = { x: number; y: number };
export type PositionAtom = Atom<Position>;
export type RectProp = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type RectAtom = PrimitiveAtom<RectProp>;
