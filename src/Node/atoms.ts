import { atom } from "jotai";
import { createInputSocket, createOutputSocket } from "../Socket";

import type { NodeAtom, NodeFn, InputAtom } from "./types";
import type { Position, PositionAtom } from "../types";
import type { InputSocket } from "../Socket";
import type { Operator } from "../Operator";

import { createRectAtom, RectAtom } from "../Rect";

export const defaultNodeSizeAtom = atom({ width: 100, height: 50 });

// input sockets depend on rect because they contain their own position.
function createInputSockets<IN>(
  rect: RectAtom,
  inputAtoms: InputAtom<IN>[]
): InputSocket<IN>[] {
  const inputPositionAnchor: PositionAtom = atom((get) => {
    const r = get(rect);
    return { x: r.x, y: r.y + r.height / 2 };
  });
  let prev = inputPositionAnchor;
  const inputSockets = inputAtoms.map((inputAtom) => {
    const input = createInputSocket(inputAtom, prev);
    prev = atom((get) => {
      const p = get(input.position);
      return { x: p.x, y: p.y + 20 };
    });
    return input;
  });

  return inputSockets;
}

export const createNodeAtom = <IN, OUT>({
  rect,
  op,
  createOutput,
}: {
  rect: RectAtom;
  op: Operator;
  createOutput: NodeFn<IN, OUT>;
}) => {
  const num = op.fn.length;
  const inputAtoms: InputAtom<IN>[] = [...Array(num).keys()].map(() => {
    return atom(atom(0)) as any; // TODO: PrimitiveAtom is not covariance
  });
  const outAtom = createOutput(inputAtoms);

  const inputSockets = createInputSockets<IN>(rect, inputAtoms);
  const outputSocket = createOutputSocket(rect, outAtom);

  return atom({ rect, inputs: inputSockets, output: outputSocket, op });
};

export const nodeAtomListAtom = atom<NodeAtom[]>([]);

type AppendProps = Omit<Parameters<typeof createNodeAtom>[0], "rect"> & {
  position: Position;
};
export const appendNodeAtom = atom(null, (_get, set, args: AppendProps) => {
  const { position, ...rest } = args;
  const rectPos = atom(position);
  const rect = createRectAtom(rectPos, defaultNodeSizeAtom);
  const nodeAtom = createNodeAtom({
    ...rest,
    rect,
  });
  set(nodeAtomListAtom, (prev) => [...prev, nodeAtom]);
});
