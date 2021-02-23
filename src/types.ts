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
export const boundingRect = (rects: Rect[]): Rect => {
  let left = Infinity;
  let top = Infinity;
  let right = 0;
  let bottom = 0;

  rects.forEach((rect) => {
    left = Math.min(rect.x, left);
    top = Math.min(rect.y, top);
    right = Math.max(rect.x + rect.width, right);
    bottom = Math.max(rect.y + rect.height, bottom);
  });

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};
export const offsetRect = (rect: Rect) => (n: number): Rect => {
  return {
    x: rect.x - n,
    y: rect.y - n,
    width: rect.width + 2 * n,
    height: rect.height + 2 * n,
  };
};

export const rectFromPos = (a: Position) => (b: Position): Rect => {
  return {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(b.x - a.x),
    height: Math.abs(b.y - a.y),
  };
};
export type RectAtom = PrimitiveAtom<Rect>;
