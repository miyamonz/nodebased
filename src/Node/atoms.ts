import { atom } from "jotai";
import { createInputSockets, createOutputSocket } from "../Socket";

import type { Variable } from "../Variable";
import type { NodeAtom, NodeComponent } from "./types";
import type { Position } from "../types";

import { createRectAtom, RectAtom } from "../Rect";
import { defaultNodeSizeVariable } from "./variables";

export const createNodeAtom = <IN, OUT>({
  rect,
  variable,
  name,
  component,
}: {
  rect: RectAtom;
  variable: Variable<IN, OUT>;
  name: string;
  component: NodeComponent;
}): NodeAtom => {
  const inputSockets = createInputSockets<IN>(rect, variable.inputAtoms);
  const outputSocket = createOutputSocket(rect, variable.outputAtom);

  return atom({
    rect,
    inputs: inputSockets,
    output: outputSocket,
    name,
    component,
  }) as any;
};

export const nodeAtomListAtom = atom<NodeAtom[]>([]);

type AppendProps = Omit<Parameters<typeof createNodeAtom>[0], "rect"> & {
  position: Position;
};

export const appendNodeAtom = atom(null, (_get, set, args: AppendProps) => {
  const { position, ...rest } = args;
  const rectPos = atom(position);
  const rect = createRectAtom(rectPos, defaultNodeSizeVariable.outputAtom);

  const nodeAtom = createNodeAtom({
    ...rest,
    rect,
  });
  set(nodeAtomListAtom, (prev) => [...prev, nodeAtom]);
});

export const hoveredNodeAtom = atom<NodeAtom | null>(null);
