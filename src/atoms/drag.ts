import { atom } from "jotai";

import type { Node, NodeAtom } from "./Node";
import type { InputSocket, OutputSocket } from "./Node";

const dragStartAtom = atom<{ x: number; y: number } | null>(null);

export const dragTargetAtom = atom<NodeAtom | null>(null);

function dragNode(dragTarget: Node, { get, set, pos }: any) {
  const dragStart = get(dragStartAtom);

  if (pos === "end") {
    set(dragStartAtom, null);
    set(dragTargetAtom, null);
  } else if (dragStart) {
    set(dragTarget.rect, (prev: any) => {
      return {
        ...prev,
        x: pos[0] + dragStart.x,
        y: pos[1] + dragStart.y,
      };
    });
  } else {
    const { x, y } = get(dragTarget.rect);
    set(dragStartAtom, {
      x: x - pos[0],
      y: y - pos[1],
    });
  }
}

export const connectTargetAtom = atom<OutputSocket | null>(null);
export const hoveredInputSocketAtom = atom<InputSocket | null>(null);

type Pos = readonly [number, number];
const dragDataAtom = atom<Pos | "end">("end");

export const dragAtom = atom(
  (get) => get(dragDataAtom),
  (get, set, pos: Pos | "end") => {
    set(dragDataAtom, pos);
    const dragTarget = get(dragTargetAtom);
    const connectTarget = get(connectTargetAtom);
    if (dragTarget) {
      const node = get(dragTarget);
      dragNode(node, { get, set, pos });
    }
    if (connectTarget) {
      if (pos === "end") {
        const hovered = get(hoveredInputSocketAtom);
        if (hovered) {
          console.log("connect");
          const newAtom = atom((get) => get(connectTarget.atom));
          hovered.atom = newAtom;
          hovered.from = connectTarget;
        }
        set(connectTargetAtom, null);
      }
    }
  }
);
