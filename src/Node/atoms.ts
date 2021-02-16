import { atom } from "jotai";
import { createInputSocket, createOutputSocket } from "../Socket";

import type { Atom, PrimitiveAtom } from "jotai";
import type { Position, RectProp } from "../types";
import type { InputSocket, OutputSocket } from "../Socket";
import type { Operator } from "../Operator";

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

export const nodeAtomListAtom = atom<NodeAtom<any, any>[]>([]);
export const addNodeAtom = atom(
  null,
  (get, set, { position, op }: { position: Position; op: Operator }) => {
    const nodeAtom = createNodeAtom({ position, op });
    set(nodeAtomListAtom, [...get(nodeAtomListAtom), nodeAtom]);
  }
);
