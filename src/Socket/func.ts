import { atom } from "jotai";
import type { Atom } from "jotai";
import type { InputSocket, OutputSocket } from "./types";
import type { InputAtom } from "../Variable";
import type { AtomRef } from "../AtomRef";
import type { RectAtom } from "../Rect";
import type { PositionAtom } from "../Position";

export const createInputSocket = <IN>(
  defaultAtom: AtomRef<IN>,
  anchor: PositionAtom
): InputSocket<IN> => {
  return {
    type: "input",
    position: atom((get) => {
      const p = get(anchor);
      return { x: p.x, y: p.y };
    }),
    ref: defaultAtom,
    atom: atom((get) => get(get(defaultAtom))),
    from: null,
  };
};

type InputSockets<IN extends unknown[]> = {
  [Key in keyof IN]: InputSocket<IN[Key]>;
};
// input sockets depend on rect because they contain their own position.
export function createInputSockets<IN extends unknown[]>(
  rect: RectAtom,
  inputsAtom: InputAtom<IN>
): Atom<InputSockets<IN>> {
  const inputPositionAnchor: PositionAtom = atom((get) => {
    const r = get(rect);
    return { x: r.x, y: r.y + r.height / 2 };
  });
  const inputSockets = atom((get) => {
    let prevPos = inputPositionAnchor;
    return get(inputsAtom).map((inputAtom) => {
      const input = createInputSocket(inputAtom, prevPos);
      prevPos = atom((get) => {
        const p = get(input.position);
        return { x: p.x, y: p.y + 20 };
      });
      return input;
    });
  });

  // TODO
  return inputSockets as any;
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
