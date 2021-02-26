import { atom } from "jotai";
import { createNodeAtom } from "./funcs";
import type { NodeAtom } from "./types";

import { createRectAtom } from "../Rect";
import { defaultNodeSizeVariable } from "./variables";
import type { Position } from "../Position";

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

export const removeNodeAtom = atom(
  null,
  (_get, set, args: NodeAtom | NodeAtom[]) => {
    const nodeAtoms = Array.isArray(args) ? args : [args];

    set(nodeAtomListAtom, (prev) =>
      prev.filter((na) => !nodeAtoms.includes(na))
    );
  }
);
