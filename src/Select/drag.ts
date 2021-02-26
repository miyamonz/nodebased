import React from "react";
import { atom, useAtom } from "jotai";
import { hoveredNodeAtom, nodeAtomListAtom } from "../Node";
import type { NodeAtom } from "../Node";
import { connectTargetAtom } from "../Socket";
import { intersect, rectFromPos } from "../Rect";
import type { Rect } from "../Rect";
import type { Position } from "../Position";
import { useMouseEvent, useMousePosition } from "../SVGContext";

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

export function useMouseToSelect() {
  const { start, drag, end } = useMouseStream();
  const [, setSelectRect] = useAtom(selectRectAtom);

  const [hoveredNode] = useAtom(hoveredNodeAtom);
  const [connectTarget] = useAtom(connectTargetAtom);
  const [, setDragStart] = useAtom(dragStartAtom);
  const [selectedRectAtomList, setSelectedRectAtomList] = useAtom(
    selectedRectAtomListAtom
  );

  const [isClick, setClick] = React.useState(false);
  const isSelected = selectedRectAtomList.length > 0;
  //start
  React.useEffect(() => {
    if (hoveredNode === null && connectTarget === null && !isSelected) {
      setSelectRect(null);
      setDragStart(start);
    }
    if (connectTarget !== null) {
      setSelectRect(null);
      setSelectedRectAtomList([]);
    }
    if (start === null) setDragStart(null);
    setClick(true);
  }, [start]);

  //drag
  React.useEffect(() => {
    if (start === null || drag === null) return;
    setSelectRect(rectFromPos(start)(drag));
    setClick(false);
  }, [start, drag]);

  const [filteredRectAtomList] = useAtom(filteredRectAtomListAtom);
  //end
  React.useEffect(() => {
    if (end === null) return;
    setSelectedRectAtomList(filteredRectAtomList);
    setDragStart(null);
    if (isClick && isSelected) {
      setSelectRect(null);
      setSelectedRectAtomList([]);
    }
  }, [end]);
}

function useMouseStream() {
  const [start, setStart] = React.useState<Position | null>(null);
  const [drag, setDrag] = React.useState<Position | null>(null);
  const [end, setEnd] = React.useState<Position | null>(null);
  const e = useMouseEvent();
  const position = useMousePosition();
  React.useEffect(() => {
    if (e === null) return;
    if (e.type === "mousedown") {
      setEnd(null);
      setStart(position);
    } else if (e.type === "mousemove" && start !== null) {
      setDrag(position);
    } else if (e.type === "mouseup" && drag !== null) {
      setEnd(position);
      setStart(null);
      setDrag(null);
    }
  }, [e, start, drag, end]);

  return { start, drag, end };
}
