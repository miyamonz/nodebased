import type { Atom } from "jotai";
export type Position = { x: number; y: number };
export type PositionAtom = Atom<Position>;

export const getCenter = (positions: Position[]) => {
  const sum = positions.reduce(
    (acc, rect) => ({ x: acc.x + rect.x, y: acc.y + rect.y }),
    {
      x: 0,
      y: 0,
    }
  );
  return {
    x: sum.x / positions.length,
    y: sum.y / positions.length,
  };
};
