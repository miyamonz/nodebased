import { atom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import type { PositionAtom, InputAtom, OutputAtom } from "../Node/atoms";
import type { Position, RectProp } from "../types";
export type RectAtom = PrimitiveAtom<RectProp>;

type Input<T> = Atom<T> | PrimitiveAtom<T>;
type Socket = {
  type: string;
  position: PositionAtom;
};
export type InputSocket<T> = Socket & {
  type: "input";
  atom: InputAtom<T>;
  from: OutputSocket<T> | null;
};
export type InputSocketConnected<T> = InputSocket<T> & {
  atom: PrimitiveAtom<Atom<T>>;
  from: OutputSocket<T>;
};
export type InputSocketNotConnected<T> = InputSocket<T> & {
  atom: PrimitiveAtom<PrimitiveAtom<T>>;
  from: null;
};

export function isConnected<T>(
  isocket: InputSocket<T>
): isocket is InputSocketConnected<T> {
  return isocket.from !== null;
}

export type OutputSocket<T> = Socket & {
  type: "output";
  atom: OutputAtom<T>;
};

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
