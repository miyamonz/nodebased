import { atom } from "jotai";
import { hoveredNodeAtom } from "../Node";
import { selectedRectAtomListAtom } from "../Select/drag";
import type { NodeAtom } from "../Node";
import type { Position } from "../types";
import type { SimpleMouseEvent } from "../Mouse";

export const dragTargetAtom = atom<NodeAtom[] | null>(null);

const positionsWhenGrabbed = atom<Map<string, Position>>(new Map());

export const dragAtomToMoveNode = atom(
  null,
  (get, set, e: SimpleMouseEvent) => {
    const hoveredNode = get(hoveredNodeAtom);
    const selectedRectAtomList = get(selectedRectAtomListAtom);
    const notSelected = selectedRectAtomList.length === 0;
    if (e.type === "down") {
      if (hoveredNode !== null && notSelected) {
        set(dragTargetAtom, [hoveredNode]);
      }
    } else if (e.type === "drag") {
    } else if (e.type === "up") {
      set(dragTargetAtom, null);
      if (notSelected) return;
      set(dragTargetAtom, selectedRectAtomList);
    }

    set(dragAtomToMoveNode_, e);
  }
);

const dragStartAtom = atom<Position | null>(null);
export const dragAtomToMoveNode_ = atom(
  null,
  (get, set, e: SimpleMouseEvent) => {
    const pos = e.position;
    if (e.type === "down") {
      const dragTarget = get(dragTargetAtom);
      if (dragTarget) {
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
    }
  }
);
