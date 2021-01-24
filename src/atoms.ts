import { atom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import type { RectProp } from "./types";

export type Node = {
  rect: RectProp;
  input: PrimitiveAtom<number>;
  out: Atom<number>;
};
export type NodeAtom = PrimitiveAtom<Node>;

const createNodeAtom = ({ x = 0, y = 0 }): NodeAtom => {
  const input = atom(0) as PrimitiveAtom<number>;
  const out = atom((get) => {
    const i = get(input);
    return i;
  });
  const rect: RectProp = { x, y, width: 100, height: 50 };
  atom({ rect, input, out });
  return atom({ rect, input, out });
};

export const nodeAtomListAtom = atom<NodeAtom[]>([]);

export const addNodeAtom = atom(null, (get, set) => {
  const nodeAtom = createNodeAtom({ x: 100, y: 20 });
  set(nodeAtomListAtom, [...get(nodeAtomListAtom), nodeAtom]);
});

const dragStartAtom = atom<{ x: number; y: number } | null>(null);
export const dragTargetAtom = atom<NodeAtom | null>(null);

export const dragAtom = atom(
  null,
  (get, set, pos: readonly [number, number] | "end") => {
    const dragTarget = get(dragTargetAtom);
    if (!dragTarget) return; // or maybe we should warn

    const dragStart = get(dragStartAtom);
    if (pos === "end") {
      set(dragStartAtom, null);
      set(dragTargetAtom, null);
    } else if (dragStart) {
      set(dragTarget, (prev) => {
        return {
          ...prev,
          rect: {
            ...prev.rect,
            x: pos[0] + dragStart.x,
            y: pos[1] + dragStart.y,
          },
        };
      });
    } else {
      const {
        rect: { x, y },
      } = get(dragTarget);
      set(dragStartAtom, {
        x: x - pos[0],
        y: y - pos[1],
      });
    }
  }
);
