import React from "react";
import { atom, useAtom } from "jotai";
import { useHoveredNode, nodeAtomListAtom } from "../Node";
import type { NodeAtom } from "../Node";
import { useConnectTarget } from "../Socket";
import { intersect, rectFromPos } from "../Rect";
import type { Rect } from "../Rect";
import type { Position } from "../Position";
import { useMouseEvent, useMousePosition } from "../SVGContext";

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

  const hoveredNode = useHoveredNode();
  const connectTarget = useConnectTarget();
  const [isDragging, setDragging] = React.useState(false);
  const [selectedRectAtomList, setSelectedRectAtomList] = useAtom(
    selectedRectAtomListAtom
  );

  const isSelected = selectedRectAtomList.length > 0;
  //start
  React.useEffect(() => {
    if (hoveredNode === null && connectTarget === null && !isSelected) {
      setSelectRect(null);
      setDragging(true);
    }
    if (connectTarget !== null) {
      setSelectedRectAtomList([]);
    }
    if (start === null) setDragging(false);
  }, [start]);

  //drag
  React.useEffect(() => {
    if (start === null || drag === null) return;
    if (isDragging) setSelectRect(rectFromPos(start)(drag));
  }, [start, drag]);

  const [filteredRectAtomList] = useAtom(filteredRectAtomListAtom);
  //end
  React.useEffect(() => {
    if (end === null) return;
    setSelectedRectAtomList(filteredRectAtomList);
    setDragging(false);
    setSelectRect(null);
  }, [end]);

  // on click
  const isClick = React.useMemo(() => {
    return start !== null && drag == null && end !== null;
  }, [start, drag, end]);
  React.useEffect(() => {
    if (isClick && isSelected) {
      setSelectedRectAtomList([]);
    }
  }, [isClick]);
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
      setDrag(null);
      setEnd(null);
      setStart(position);
    } else if (e.type === "mousemove" && start !== null && end === null) {
      setDrag(position);
    } else if (e.type === "mouseup") {
      setEnd(position);
    }
  }, [e, start, drag, end]);

  return { start, drag, end };
}
