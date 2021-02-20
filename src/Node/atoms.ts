import { atom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { createInputSocket, createOutputSocket } from "../Socket";

import type { NodeAtom } from "./types";
import type { Position, PositionAtom, RectAtom } from "../types";
import type { InputSocket } from "../Socket";
import type { Operator } from "../Operator";

export const defaultNodeSizeAtom = atom({ width: 100, height: 50 });

function createRectAtom(posAtom: PrimitiveAtom<Position>): RectAtom {
  const rect = atom(
    (get) => {
      const defaultSize = get(defaultNodeSizeAtom);
      const position = get(posAtom);
      return {
        ...position,
        ...defaultSize,
      };
    },
    (get, set, action) => {
      const newRect = typeof action === "function" ? action(get(rect)) : action;
      set(posAtom, { x: newRect.x, y: newRect.y });
    }
  );
  return rect;
}

export const createNodeAtom = <IN, OUT>({
  position,
  op,
}: {
  position: Position;
  op: Operator;
}) => {
  const rectPos = atom(position);
  const rect = createRectAtom(rectPos);

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

  const fn = op.fn as (...args: IN[]) => OUT;
  const outAtom = createOutAtom(inputs, fn);
  const output = createOutputSocket(rect, outAtom);

  return atom({ rect, inputs, output, op });
};

function createOutAtom<IN, OUT>(
  inputs: InputSocket<IN>[],
  fn: (...args: IN[]) => OUT
) {
  const outAtom = atom((get) => {
    const inputValues = inputs
      .map((i) => i.atom)
      .map(get)
      .map(get);
    return fn(...inputValues);
  });
  return outAtom;
}

export const nodeAtomListAtom = atom<NodeAtom[]>([]);
export const addNodeAtom = atom(
  null,
  (_get, set, args: Parameters<typeof createNodeAtom>[0]) => {
    const nodeAtom = createNodeAtom(args);
    set(nodeAtomListAtom, (prev) => [...prev, nodeAtom]);
  }
);
