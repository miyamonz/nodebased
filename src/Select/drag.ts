import { atom, useAtom } from "jotai";
import { hoveredNodeAtom, nodeAtomListAtom } from "../Node";
import type { NodeAtom } from "../Node";
import { connectTargetAtom } from "../Socket";
import { intersect, rectFromPos } from "../Rect";
import type { Rect } from "../Rect";
import type { Position } from "../Position";
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

const filteredRectAtomListAtom = atom((get) => {
  const nodeAtomList = get(nodeAtomListAtom);
  const selectRect = get(selectRectAtom);
  if (selectRect === null) return [];
  return nodeAtomList.filter((node) =>
    intersect(selectRect)(get(get(node).rect))
  );
});
export const selectedRectAtomListAtom = atom<NodeAtom[]>([]);

const isClick = atom(false);
export const dragAtomToSelect = atom(null, (get, set, e: SimpleMouseEvent) => {
  const pos = e.position;
  const isNotHovered = get(hoveredNodeAtom) === null;
  const connectTargetExists = get(connectTargetAtom) !== null;

  const isSelected = get(selectedRectAtomListAtom).length > 0;

  const startPos = get(dragStartAtom);
  if (e.type === "down") {
    if (isNotHovered && !connectTargetExists && !isSelected) {
      set(dragStartAtom, pos);
      set(selectRectAtom, null);
    }
    if (connectTargetExists) {
      console.log("exists");
      set(selectRectAtom, null);
      set(selectedRectAtomListAtom, []);
    }

    set(isClick, true);
  } else if (e.type === "drag") {
    if (startPos !== null) {
      set(selectRectAtom, rectFromPos(startPos)(pos));
    }
    set(isClick, false);
  } else if (e.type === "up") {
    if (startPos !== null) {
      set(selectedRectAtomListAtom, get(filteredRectAtomListAtom));
      set(dragStartAtom, null);
    }
    if (get(isClick) && isSelected) {
      set(selectRectAtom, null);
      set(selectedRectAtomListAtom, []);
    }
  }
});
