import { atom, useAtom } from "jotai";
import type { Position, Rect } from "../types";
import type { SimpleMouseEvent } from "../Mouse";

const dragStartAtom = atom<Position | null>(null);
export const isDraggingAtom = atom((get) => {
  const p = get(dragStartAtom);
  return p !== null;
});
const selectRectAtom = atom<Rect | null>(null);
export function useSelectRectAtom() {
  const [rect] = useAtom(selectRectAtom);
  return rect;
}

export const dragAtomToSelect = atom(null, (get, set, e: SimpleMouseEvent) => {
  const pos = e.position;
  if (e.type === "down") {
    set(dragStartAtom, {
      x: pos.x,
      y: pos.y,
    });
    set(selectRectAtom, null);
  } else if (e.type === "drag") {
    const startPos = get(dragStartAtom);
    if (startPos === null)
      throw new Error("dragging but start pos is not assigned");
    set(selectRectAtom, {
      ...startPos,
      x: Math.min(startPos.x, pos.x),
      y: Math.min(startPos.y, pos.y),
      width: Math.abs(pos.x - startPos.x),
      height: Math.abs(pos.y - startPos.y),
    });
  } else if (e.type === "up") {
    set(dragStartAtom, null);
  }
});
