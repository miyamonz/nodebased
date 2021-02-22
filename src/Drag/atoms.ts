import { atom, useAtom } from "jotai";

import type { Node, NodeAtom } from "../Node";
import type { InputSocket, OutputSocket } from "../Socket";
import type { Position } from "../types";

const dragOffsetAtom = atom<Position | null>(null);

export const dragTargetAtom = atom<NodeAtom | null>(null);

export const connectTargetAtom = atom<OutputSocket<unknown> | null>(null);
export const hoveredInputSocketAtom = atom<InputSocket<unknown> | null>(null);

type Pos = readonly [number, number];
const dragDataAtom = atom<Pos | "end">("end");

export const dragAtom = atom(
  (get) => get(dragDataAtom),
  (get, set, pos: Pos | "end") => {
    set(dragDataAtom, pos);

    // drag node
    const dragTarget = get(dragTargetAtom);
    if (dragTarget) {
      const target = get(dragTarget);
      set(dragNodeAtom, { target, pos });
      return;
    }

    // connect
    const connectTarget = get(connectTargetAtom);
    if (pos === "end" && connectTarget) {
      set(dragConnectAtom, connectTarget);
    }
  }
);

export function useSetDragHook() {
  const [, setDrag] = useAtom(dragAtom);
  return setDrag;
}

const dragNodeAtom = atom(
  null,
  (get, set, { target, pos }: { target: Node; pos: Pos | "end" }) => {
    const dragOffset = get(dragOffsetAtom);

    if (pos === "end") {
      set(dragOffsetAtom, null);
      set(dragTargetAtom, null);
    } else if (dragOffset) {
      set(target.rect, (prev) => {
        return {
          ...prev,
          x: pos[0] - dragOffset.x,
          y: pos[1] - dragOffset.y,
        };
      });
    } else {
      const { x, y } = get(target.rect);
      set(dragOffsetAtom, {
        x: pos[0] - x,
        y: pos[1] - y,
      });
    }
  }
);

const dragConnectAtom = atom(
  null,
  (get, set, connectTarget: OutputSocket<unknown>) => {
    const hovered = get(hoveredInputSocketAtom);
    if (hovered) {
      console.log("connect", connectTarget, hovered);
      const newAtom = atom((get) => get(connectTarget.atom));
      hovered.from = connectTarget;
      // set new atom that will return target atom's value into hovered inputSocket
      set(hovered.atom, newAtom);
    }
    set(connectTargetAtom, null);
  }
);
