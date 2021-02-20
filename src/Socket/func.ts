import { atom } from "jotai";
import type { Input, InputSocket, OutputSocket } from "./types";
import type { PositionAtom, RectAtom } from "../types";

export const createInputSocket = <IN>(
  defaultAtom: Input<IN>,
  anchor: PositionAtom
): InputSocket<IN> => {
  return {
    type: "input",
    position: atom((get) => {
      const p = get(anchor);
      return { x: p.x, y: p.y };
    }),
    atom: atom(defaultAtom),
    from: null,
  };
};

export const createOutputSocket = <OUT>(
  rectAtom: RectAtom,
  outAtom: OutputSocket<OUT>["atom"]
): OutputSocket<OUT> => {
  const position = atom((get) => {
    const rect = get(rectAtom);
    return { x: rect.x + rect.width, y: rect.y + rect.height / 2 };
  });
  return {
    type: "output",
    position,
    atom: outAtom,
  };
};
