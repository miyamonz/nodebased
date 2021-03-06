import { atom } from "jotai";
import { createNodeAtom } from "./funcs";

import { createRectAtom } from "../Rect";
import { defaultNodeSizeVariable } from "./variables";
import type { Position } from "../Position";

type AppendProps = Omit<Parameters<typeof createNodeAtom>[0], "rect"> & {
  position: Position;
};

function createRect(position: Position) {
  const rectPos = atom(position);
  const [outputAtom] = defaultNodeSizeVariable.outputAtoms;
  const rect = createRectAtom(rectPos, outputAtom);
  return rect;
}

export function createNodeAtomFromPosition(args: AppendProps) {
  const { position, ...rest } = args;
  const rect = createRect(position);

  const nodeAtom = createNodeAtom({
    ...rest,
    rect,
  });
  return nodeAtom;
}
