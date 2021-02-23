import { atom } from "jotai";
import type { InputSocket, OutputSocket } from "./types";
import type { InputAtom } from "../Variable";
import type { RectAtom } from "../Rect";
import type { PositionAtom } from "../types";

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

// input sockets depend on rect because they contain their own position.
export function createInputSockets<IN>(
  rect: RectAtom,
  inputAtoms: InputAtom<IN>[]
): InputSocket<IN>[] {
  const inputPositionAnchor: PositionAtom = atom((get) => {
    const r = get(rect);
    return { x: r.x, y: r.y + r.height / 2 };
  });
  let prevPos = inputPositionAnchor;
  const inputSockets = inputAtoms.map((inputAtom) => {
    const input = createInputSocket(inputAtom, prevPos);
    prevPos = atom((get) => {
      const p = get(input.position);
      return { x: p.x, y: p.y + 20 };
    });
    return input;
  });

  return inputSockets;
}

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
