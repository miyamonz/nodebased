import { atom } from "jotai";

import type { Atom, PrimitiveAtom } from "jotai";
import type { Position, RectProp } from "../types";

export type PositionAtom = Atom<Position>;

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

export type OutputSocket<T> = Socket & {
  type: "output";
  atom: OutputAtom<T>;
};

type Input<T> = Atom<T> | PrimitiveAtom<T>;

export type InputAtom<T> = PrimitiveAtom<Input<T>>;
export type OutputAtom<T> = Atom<T>;

export type RectAtom = PrimitiveAtom<RectProp>;

export type Node<I, O> = {
  rect: RectAtom;
  input: InputSocket<I>;
  output: OutputSocket<O>;
};
export type NodeAtom<I, O> = PrimitiveAtom<Node<I, O>>;

const createInputSocket = (rectAtom: RectAtom): InputSocket<number> => {
  const zeroAtom: Input<number> = atom(0);
  return {
    type: "input",
    position: atom((get) => {
      const rect = get(rectAtom);
      return { x: rect.x, y: rect.y + rect.height / 2 };
    }),
    atom: atom(zeroAtom),
    from: null,
  };
};

const createOutputSocket = <T>(
  rectAtom: RectAtom,
  inputAtom: InputAtom<T>
): OutputSocket<T> => {
  return {
    type: "output",
    position: atom((get) => {
      const rect = get(rectAtom);
      return { x: rect.x + rect.width, y: rect.y + rect.height / 2 };
    }),
    atom: atom((get) => get(get(inputAtom))),
  };
};

export const createNodeAtom = ({ x = 0, y = 0 }): NodeAtom<number, number> => {
  const rect: PrimitiveAtom<RectProp> = atom({ x, y, width: 100, height: 50 });
  const input = createInputSocket(rect);
  const output = createOutputSocket(rect, input.atom);
  return atom({ rect, input, output });
};
