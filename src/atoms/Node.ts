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
  inputs: InputSocket<I>[];
  output: OutputSocket<O>;
  op: Operator;
};
export type NodeAtom<I, O> = PrimitiveAtom<Node<I, O>>;

const createInputSocket = <IN>(
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

const createOutputSocket = <IN, OUT>(
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
  const inputPositionAnchor: Atom<Position> = atom((get) => {
    const r = get(rect);
    return { x: r.x, y: r.y + r.height / 2 };
  });
  let prev = inputPositionAnchor;
  const inputs = [...Array(op.fn.length).keys()].map(() => {
    const input = (createInputSocket(
      atom(0),
      prev
    ) as unknown) as InputSocket<IN>;
    prev = atom((get) => {
      const p = get(input.position);
      return { x: p.x, y: p.y + 20 };
    });
    return input;
  });

  const output = createOutputSocket<IN, OUT>(
    rect,
    inputs,
    op.fn as (...args: IN[]) => OUT
  );

  return atom({ rect, inputs, output, op });
};
