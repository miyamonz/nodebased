import { atom, useAtom } from "jotai";
import type { WritableAtom } from "jotai";
import type { SimpleMouseEvent } from "./types";

import { dragAtomToSelect } from "../Select/drag";
import { dragAtomToMoveNode } from "../MoveNode";

const dragDataAtom = atom<SimpleMouseEvent>({
  type: "up",
  position: { x: 0, y: 0 },
});

export type WritableDragAtom = WritableAtom<null, SimpleMouseEvent>;

const registeredDragAtoms = atom<WritableDragAtom[]>([
  dragAtomToSelect,
  dragAtomToMoveNode,
]);

export const dragAtom = atom(
  (get) => get(dragDataAtom),
  (get, set, pos: SimpleMouseEvent) => {
    set(dragDataAtom, pos);

    const atoms = get(registeredDragAtoms);
    atoms.forEach((a) => set(a, pos));
  }
);

export const useDragAtom = () => {
  const [drag, setDrag] = useAtom(dragAtom);

  return [drag, setDrag] as const;
};
