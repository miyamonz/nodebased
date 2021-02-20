import { atom } from "jotai";
import { createInputSockets, createOutputSocket } from "../Socket";

import { createVariable, Variable } from "../Variable";
import type { NodeAtom, NodeFn, InputAtom, OutputAtom } from "./types";
import type { Position } from "../types";
import type { Operator } from "../Operator";

import { createRectAtom, RectAtom } from "../Rect";

export const createNodeAtom = <IN, OUT>({
  rect,
  op,
  variable,
}: {
  rect: RectAtom;
  op: Operator;
  variable: Variable<IN, OUT>;
}) => {
  const inputSockets = createInputSockets<IN>(rect, variable.inputAtoms);
  const outputSocket = createOutputSocket(rect, variable.outputAtom);

  return atom({ rect, inputs: inputSockets, output: outputSocket, op });
};

export const nodeAtomListAtom = atom<NodeAtom[]>([]);

type AppendProps = Omit<Parameters<typeof createNodeAtom>[0], "rect"> & {
  position: Position;
};
export const defaultNodeSizeAtom = atom({ width: 100, height: 50 });
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
