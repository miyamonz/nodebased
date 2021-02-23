import type { Atom, PrimitiveAtom } from "jotai";
export type Position = { x: number; y: number };
export type PositionAtom = Atom<Position>;
export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export const intersect = (a: Rect) => (b: Rect) => {
  const leftA = a.x;
  const rightA = a.x + a.width;
  const topA = a.y;
  const bottomA = a.y + a.height;

  const leftB = b.x;
  const rightB = b.x + b.width;
  const topB = b.y;
  const bottomB = b.y + b.height;

  const notOverX = rightA < leftB || rightB < leftA;
  const notOverY = bottomA < topB || bottomB < topA;

  return !notOverX && !notOverY;
};
export type RectAtom = PrimitiveAtom<Rect>;
