import { atom } from "jotai";
import type { InputSocket, InputSocketJSON } from "./types";
import type { OutputSocket, OutputSocketJSON } from "./types";
import type { PositionAtom } from "../Position";

export const createInputSocket = <IN>(
  json: InputSocketJSON,
  anchor: PositionAtom
): InputSocket<IN> => {
  return {
    ...json,
    position: atom((get) => {
      const p = get(anchor);
      return { x: p.x, y: p.y };
    }),
  };
};

export const createOutputSocket = <OUT>(
  json: OutputSocketJSON,
  position: PositionAtom
): OutputSocket<OUT> => {
  return {
    ...json,
    position,
  };
};
