import { atom } from "jotai";

import type { Stream } from "../Stream";
import type { Node } from "../Node";

export const currentStreamsAtom = atom<Record<Node["id"], Stream>>({});
export const appendStreamAtom = atom<null, [Node["id"], Stream]>(
  null,
  (_get, set, [nodeId, stream]) => {
    set(currentStreamsAtom, (prev) => {
      return { ...prev, [nodeId]: stream };
    });
  }
);
export const removeStreamAtom = atom<null, Node["id"]>(
  null,
  (get, set, nodeId) => {
    set(currentStreamsAtom, (prev) => {
      // remove input connection when remove node
      get(prev[nodeId].inputAtoms).forEach((a) => set(a, atom(null)));
      delete prev[nodeId];
      return { ...prev };
    });
  }
);
