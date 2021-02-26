import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { hoveredNodeAtom } from "../Node";
import type { NodeAtom } from "../Node";
import { selectedRectAtomListAtom } from "../Select/drag";
import type { Position } from "../Position";
import { useMouseStream } from "../SVGContext";

const positionsWhenGrabbed = atom<Map<string, Position>>(new Map());

const setGrabAtom = atom(null, (get, set, dragTarget: NodeAtom[]) => {
  const keyValues = dragTarget.map((nodeAtom) => {
    const key = nodeAtom.toString();
    const rect = get(get(nodeAtom).rect);
    const pos = { x: rect.x, y: rect.y };
    return [key, pos] as const;
  });
  set(positionsWhenGrabbed, new Map(keyValues));
});

const setDragDiffAtom = atom(
  null,
  (get, set, [mouseDiff, dragTarget]: [Position, NodeAtom[]]) => {
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
);

function useDragSelected() {
  const [dragTarget] = useAtom(selectedRectAtomListAtom);
  const { start, drag } = useMouseStream(
    dragTarget !== null,
    dragTarget !== null
  );

  const [, setGrab] = useAtom(setGrabAtom);
  useEffect(() => {
    if (start === null) return;
    setGrab(dragTarget);
  }, [start]);
  const [, setDragDiff] = useAtom(setDragDiffAtom);

  useEffect(() => {
    if (start === null || drag === null) return;
    const mouseDiff = { x: drag.x - start.x, y: drag.y - start.y };
    setDragDiff([mouseDiff, dragTarget]);
  }, [drag]);
}

function useDragHovered() {
  const [hoveredNode] = useAtom(hoveredNodeAtom);
  const { start, drag } = useMouseStream(hoveredNode !== null);

  const [, setGrab] = useAtom(setGrabAtom);
  useEffect(() => {
    if (start === null) return;
    if (hoveredNode === null) return;
    setGrab([hoveredNode]);
  }, [start]);
  const [, setDragDiff] = useAtom(setDragDiffAtom);

  useEffect(() => {
    if (start === null || drag === null) return;
    if (hoveredNode === null) return;
    const mouseDiff = { x: drag.x - start.x, y: drag.y - start.y };
    setDragDiff([mouseDiff, [hoveredNode]]);
  }, [drag]);
}

export function useDragMoveNode() {
  useDragSelected();
  useDragHovered();
}
