import { atom } from "jotai";
import { createNodeAtom } from "./funcs";

import { createRectAtom } from "../Rect";
import { defaultNodeSizeVariable } from "./variables";
import type { Position } from "../Position";

type AppendProps = Omit<Parameters<typeof createNodeAtom>[0], "rect"> & {
  position: Position;
};

export function createNodeAtomFromPosition(args: AppendProps) {
  const { position, ...rest } = args;
  const rectPos = atom(position);
  const rect = createRectAtom(rectPos, defaultNodeSizeVariable.outputAtom);

  const nodeAtom = createNodeAtom({
    ...rest,
    rect,
  });
  return nodeAtom;
}
