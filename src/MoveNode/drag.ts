import { atom } from "jotai";
import { hoveredNodeAtom } from "../Node";
import { selectedRectAtomListAtom } from "../Select/drag";
import type { Position } from "../Position";
import type { Event } from "../Mouse";
import { useDrag } from "../useDrag";

const isSetByClick = atom(false);

export const dragAtomToMoveNode = atom(null, (get, set, e: Event) => {
  const hoveredNode = get(hoveredNodeAtom);
  const selectedRectAtomList = get(selectedRectAtomListAtom);
  const notSelected = selectedRectAtomList.length === 0;
  if (e.type === "mousedown") {
    if (hoveredNode !== null && notSelected) {
      set(selectedRectAtomListAtom, [hoveredNode]);
      set(isSetByClick, true);
    }
  } else if (e.type === "mouseup") {
    if (get(isSetByClick)) {
      set(selectedRectAtomListAtom, []);
      set(isSetByClick, false);
    }
  }

  set(dragAtomToMoveNode_, e);
});

export function useDragMoveNode() {
  return useDrag(dragAtomToMoveNode);
}

const isDown = atom(false);
const dragStartAtom = atom<Position | null>(null);
const positionsWhenGrabbed = atom<Map<string, Position>>(new Map());
export const dragAtomToMoveNode_ = atom(null, (get, set, e: Event) => {
  const pos = e.position;
  const dragTarget = get(selectedRectAtomListAtom);
  if (e.type === "mousedown") {
    set(isDown, true);
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
  } else if (e.type === "mousemove" && get(isDown)) {
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
  } else if (e.type === "mouseup") {
    set(isDown, false);
    set(dragStartAtom, null);
  }
});
