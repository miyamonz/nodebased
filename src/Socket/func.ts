import { atom } from "jotai";
import type { InputSocket, OutputSocket } from "./types";
import type { InputAtom } from "../Node";
import type { PositionAtom, RectAtom } from "../types";

export const createInputSocket = <IN>(
  defaultAtom: InputAtom<IN>,
  anchor: PositionAtom
): InputSocket<IN> => {
  return {
    type: "input",
    position: atom((get) => {
      const p = get(anchor);
      return { x: p.x, y: p.y };
    }),
    atom: defaultAtom,
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
