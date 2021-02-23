import { atom, useAtom } from "jotai";
import { hoveredNodeAtom, nodeAtomListAtom } from "../Node";
import { connectTargetAtom } from "../Connect/atoms";
import type { Position, Rect } from "../types";
import type { SimpleMouseEvent } from "../Mouse";
import { intersect } from "../types";

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

export const selectedRectAtomListAtom = atom((get) => {
  const nodeAtomList = get(nodeAtomListAtom);
  const selectRect = get(selectRectAtom);
  if (selectRect === null) return [];
  return nodeAtomList.filter((node) =>
    intersect(selectRect)(get(get(node).rect))
  );
});

const isClick = atom(false);
export const dragAtomToSelect = atom(null, (get, set, e: SimpleMouseEvent) => {
  const pos = e.position;
  const isNotHovered = get(hoveredNodeAtom) === null;
  const notConnectTarget = get(connectTargetAtom) === null;

  const isSelected = get(selectedRectAtomListAtom).length > 0;
  if (e.type === "down") {
    if (isNotHovered && notConnectTarget && !isSelected) {
      set(dragStartAtom, {
        x: pos.x,
        y: pos.y,
      });
      set(selectRectAtom, null);
    }
    set(isClick, true);
  } else if (e.type === "drag") {
    const startPos = get(dragStartAtom);
    if (startPos === null) return;
    set(selectRectAtom, {
      ...startPos,
      x: Math.min(startPos.x, pos.x),
      y: Math.min(startPos.y, pos.y),
      width: Math.abs(pos.x - startPos.x),
      height: Math.abs(pos.y - startPos.y),
    });
    set(isClick, false);
  } else if (e.type === "up") {
    set(dragStartAtom, null);
    if (get(isClick) && isSelected) {
      set(selectRectAtom, null);
    }
  }
});
