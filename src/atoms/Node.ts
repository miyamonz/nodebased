import { atom } from "jotai";

import type { Atom, PrimitiveAtom } from "jotai";
import type { Position, RectProp } from "../types";
import type { InputSocket, OutputSocket } from "../Socket";

export type PositionAtom = Atom<Position>;

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

export const createNodeAtom = ({
  x,
  y,
}: Position): NodeAtom<number, number> => {
  const rect: PrimitiveAtom<RectProp> = atom({ x, y, width: 100, height: 50 });
  const input = createInputSocket(rect);
  const output = createOutputSocket(rect, input.atom);
  return atom({ rect, input, output });
};
