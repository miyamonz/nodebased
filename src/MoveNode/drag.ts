import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { hoveredNodeAtom } from "../Node";
import { selectedRectAtomListAtom } from "../Select/drag";
import type { Position } from "../Position";
import { useEvent, Event } from "../SVGContext";
import { useMouseStream } from "../SVGContext";

const isSetByClick = atom(false);

const dragAtomToMoveNode = atom(null, (get, set, e: Event) => {
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
});

const positionsWhenGrabbed = atom<Map<string, Position>>(new Map());

const setGrabAtom = atom(null, (get, set) => {
  const dragTarget = get(selectedRectAtomListAtom);
  if (dragTarget === null) return;
  const keyValues = dragTarget.map((nodeAtom) => {
    const key = nodeAtom.toString();
    const rect = get(get(nodeAtom).rect);
    const pos = { x: rect.x, y: rect.y };
    return [key, pos] as const;
  });
  set(positionsWhenGrabbed, new Map(keyValues));
});

const setDragDiffAtom = atom(null, (get, set, mouseDiff: Position) => {
  const dragTarget = get(selectedRectAtomListAtom);
  if (dragTarget === null) return;

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
});

export function useDragMoveNode() {
  const { start, drag } = useMouseStream();

  const [, setGrab] = useAtom(setGrabAtom);
  useEffect(() => {
    if (start === null) return;
    setGrab();
  }, [start]);
  const [, setDragDiff] = useAtom(setDragDiffAtom);

  useEffect(() => {
    if (start === null || drag === null) return;
    const mouseDiff = { x: drag.x - start.x, y: drag.y - start.y };
    setDragDiff(mouseDiff);
  }, [drag]);
}
