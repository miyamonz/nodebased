import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useHoveredNode } from "../Node";
import type { Node } from "../Node";
import { useSelectedNodes } from "../Select";
import { useMouseStream } from "../SVGContext";

import { setGrabAtom, setDragDiffAtom } from "./drag";

export const grabbedNodeAtom = atom<Node | null>(null);

export function useDragHoveredNode() {
  const hoveredNode = useHoveredNode();
  const selectedNodes = useSelectedNodes();
  const startCond = hoveredNode !== null && selectedNodes.length < 1;
  const { start, drag, end } = useMouseStream(startCond);
  const [grabbed, setGrabbed] = useAtom(grabbedNodeAtom);

  const [, setGrab] = useAtom(setGrabAtom);
  useEffect(() => {
    if (start === null) return;
    if (hoveredNode === null) return;
    setGrab([hoveredNode]);
    setGrabbed(hoveredNode);
  }, [start]);
  const [, setDragDiff] = useAtom(setDragDiffAtom);

  useEffect(() => {
    if (start === null || drag === null) return;
    if (grabbed === null) return;
    const mouseDiff = { x: drag.x - start.x, y: drag.y - start.y };
    setDragDiff([mouseDiff, [grabbed]]);
  }, [drag]);
  useEffect(() => {
    if (end === null) return;
    setGrabbed(null);
  }, [end]);
}
