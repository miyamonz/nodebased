import { atom } from "jotai";
import type {
  Input,
  InputSocket,
  InputSocketConnected,
  OutputSocket,
} from "./types";
import type { Atom, PrimitiveAtom } from "jotai";
import type { Position, RectProp } from "../types";

export type { InputSocket, InputSocketConnected, OutputSocket };
export type RectAtom = PrimitiveAtom<RectProp>;

export function isConnected<T>(
  isocket: InputSocket<T>
): isocket is InputSocketConnected<T> {
  return isocket.from !== null;
}

export const createInputSocket = <IN>(
  defaultAtom: Input<IN>,
  anchor: Atom<Position>
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

export const createOutputSocket = <IN, OUT>(
  rectAtom: RectAtom,
  inputs: InputSocket<IN>[],
  fn: (...args: IN[]) => OUT
): OutputSocket<OUT> => {
  return {
    type: "output",
    position: atom((get) => {
      const rect = get(rectAtom);
      return { x: rect.x + rect.width, y: rect.y + rect.height / 2 };
    }),
    atom: atom((get) => {
      const inputValues = inputs
        .map((i) => i.atom)
        .map(get)
        .map(get);
      return fn(...inputValues);
    }),
  };
};
