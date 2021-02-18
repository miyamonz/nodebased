import { atom } from "jotai";
import { createInputSocket, createOutputSocket } from "../Socket";

import type { NodeAtom } from "./types";
import type { Position, PositionAtom, RectAtom } from "../types";
import type { InputSocket } from "../Socket";
import type { Operator } from "../Operator";

export const createNodeAtom = <IN, OUT>({
  position,
  op,
}: {
  position: Position;
  op: Operator;
}) => {
  const rect: RectAtom = atom({
    ...position,
    width: 100,
    height: 50,
  });
  const inputPositionAnchor: PositionAtom = atom((get) => {
    const r = get(rect);
    return { x: r.x, y: r.y + r.height / 2 };
  });
  let prev = inputPositionAnchor;
  const inputs = [...Array(op.fn.length).keys()].map(() => {
    const input = (createInputSocket(
      atom(0),
      prev
    ) as unknown) as InputSocket<IN>; // force InputSocket<number> to InputSocket<IN>. you should initialize atom depends on its type
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

export const nodeAtomListAtom = atom<NodeAtom[]>([]);
export const addNodeAtom = atom(
  null,
  (_get, set, args: Parameters<typeof createNodeAtom>[0]) => {
    const nodeAtom = createNodeAtom(args);
    set(nodeAtomListAtom, (prev) => [...prev, nodeAtom]);
  }
);
