import { atom, useAtom } from "jotai";
import type { Node, NodeAtom } from "../Node";
import type { Position } from "../types";
import type { SimpleMouseEvent } from "../Mouse";

const dragStartAtom = atom<Position | null>(null);
export const isDraggingAtom = atom((get) => {
  const p = get(dragStartAtom);
  return p !== null;
});

export const hoveredNodeAtom = atom<NodeAtom | null>(null);
export const dragTargetAtom = atom<NodeAtom[] | null>(null);

const positionsWhenGrabbed = atom<Map<string, Position>>(new Map());

export const dragAtomToMoveNode = atom(
  null,
  (get, set, e: SimpleMouseEvent) => {
    const pos = e.position;
    const hoveredNode = get(hoveredNodeAtom);
    if (e.type === "down") {
      if (hoveredNode !== null) {
        set(dragTargetAtom, [hoveredNode]);
      }
      const dragTarget = get(dragTargetAtom);
      if (dragTarget) {
        console.log(dragTarget);
        const keyValues = dragTarget.map((nodeAtom) => {
          const key = nodeAtom.toString();
          const rect = get(get(nodeAtom).rect);
          const pos = { x: rect.x, y: rect.y };
          return [key, pos] as const;
        });
        set(positionsWhenGrabbed, new Map(keyValues));
      }

      set(dragStartAtom, { x: pos.x, y: pos.y });
    } else if (e.type === "drag") {
      const dragTarget = get(dragTargetAtom);
      const startPos = get(dragStartAtom);
      if (startPos === null) throw new Error();
      const mouseDiff = { x: pos.x - startPos.x, y: pos.y - startPos.y };
      if (dragTarget) {
        const positions = get(positionsWhenGrabbed);

        dragTarget.forEach((nodeAtom) => {
          const startRectPos = positions.get(nodeAtom.toString());
          if (startRectPos === undefined) throw new Error();
          const moved = {
            x: startRectPos.x + mouseDiff.x,
            y: startRectPos.y + mouseDiff.y,
          };
          set(get(nodeAtom).rect, (prev) => ({ ...prev, ...moved }));
        });
      }
    } else if (e.type === "up") {
      set(dragStartAtom, null);
      set(dragTargetAtom, null);
    }
  }
);
