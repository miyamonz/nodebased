import { atom } from "jotai";

import type { Atom, PrimitiveAtom } from "jotai";
import type { Position, RectProp } from "../types";
import type { InputSocket, OutputSocket } from "../Socket";
import type { Operator } from "../Operator";

export type PositionAtom = Atom<Position>;

type Input<T> = Atom<T> | PrimitiveAtom<T>;

export type InputAtom<T> = PrimitiveAtom<Input<T>>;
export type OutputAtom<T> = Atom<T>;

export type RectAtom = PrimitiveAtom<RectProp>;

export type Node<I, O> = {
  rect: RectAtom;
  input: InputSocket<I>;
  output: OutputSocket<O>;
  op: Operator;
};
export type NodeAtom<I, O> = PrimitiveAtom<Node<I, O>>;

const createInputSocket = <IN>(
  defaultAtom: Input<IN>,
  rectAtom: RectAtom
): InputSocket<IN> => {
  return {
    type: "input",
    position: atom((get) => {
      const rect = get(rectAtom);
      return { x: rect.x, y: rect.y + rect.height / 2 };
    }),
    atom: atom(defaultAtom),
    from: null,
  };
};

const createOutputSocket = <IN, OUT>(
  rectAtom: RectAtom,
  inputAtom: InputAtom<IN>,
  fn: (...args: IN[]) => OUT
): OutputSocket<OUT> => {
  return {
    type: "output",
    position: atom((get) => {
      const rect = get(rectAtom);
      return { x: rect.x + rect.width, y: rect.y + rect.height / 2 };
    }),
    atom: atom((get) => {
      const input = get(inputAtom);
      return fn(get(input));
    }),
  };
};

export const createNodeAtom = <IN, OUT>({
  position,
  op,
}: {
  position: Position;
  op: Operator;
}): NodeAtom<IN, OUT> => {
  const rect: PrimitiveAtom<RectProp> = atom({
    ...position,
    width: 100,
    height: 50,
  });
  const input = (createInputSocket(
    atom(0),
    rect
  ) as unknown) as InputSocket<IN>;
  const output = createOutputSocket<IN, OUT>(rect, input.atom, op.fn);

  return atom({ rect, input, output, op });
};
