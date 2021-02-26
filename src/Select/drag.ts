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

function useStartCond() {
  const hoveredNode = useHoveredNode();
  const connectTarget = useConnectTarget();
  const [selectedRectAtomList] = useAtom(selectedRectAtomListAtom);
  const isSelected = selectedRectAtomList.length > 0;

  return React.useMemo(
    () => hoveredNode === null && connectTarget === null && !isSelected,
    [hoveredNode, connectTarget, isSelected]
  );
}

export function useMouseToSelect() {
  const startCond = useStartCond();
  const { start, drag, end } = useMouseStream(startCond);

  const [, setSelectedRectAtomList] = useAtom(selectedRectAtomListAtom);
  const [, setSelectRect] = useAtom(selectRectAtom);

  //start
  React.useEffect(() => {
    if (start === null) return;
    setSelectedRectAtomList([]);
  }, [start]);

  //drag
  React.useEffect(() => {
    if (start === null || drag === null) return;
    setSelectRect(rectFromPos(start)(drag));
  }, [drag]);

  const [filteredRectAtomList] = useAtom(filteredRectAtomListAtom);
  //end
  React.useEffect(() => {
    if (end === null) return;
    setSelectedRectAtomList(filteredRectAtomList);
    setSelectRect(null);
  }, [end]);

  // on click
  const isClick = React.useMemo(() => {
    return start !== null && drag == null && end !== null;
  }, [start, drag, end]);
  React.useEffect(() => {
    if (isClick) {
      setSelectedRectAtomList([]);
    }
  }, [isClick]);
}

function useMouseStream(startCond = true, dragCond = true, endCond = true) {
  const [start, setStart] = React.useState<Position | null>(null);
  const [drag, setDrag] = React.useState<Position | null>(null);
  const [end, setEnd] = React.useState<Position | null>(null);
  const e = useMouseEvent();
  const position = useMousePosition();
  React.useEffect(() => {
    if (e === null) return;
    if (e.type === "mousedown" && startCond) {
      setDrag(null);
      setEnd(null);
      setStart(position);
    } else if (
      e.type === "mousemove" &&
      dragCond &&
      start !== null &&
      end === null
    ) {
      setDrag(position);
    } else if (e.type === "mouseup" && endCond) {
      setEnd(position);
    }
  }, [e, start, drag, end]);

  return { start, drag, end };
}
