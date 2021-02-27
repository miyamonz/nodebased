import { useState } from "react";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { useHoveredNode } from "../Node";
import { useSelectedNodes } from "../Select";
import { useMouseStream } from "../SVGContext";

import { setGrabAtom, setDragDiffAtom } from "./drag";

export function useDragHoveredNode() {
  const hoveredNode = useHoveredNode();
  const selectedNodes = useSelectedNodes();
  const startCond = hoveredNode !== null && selectedNodes.length <= 1;
  const { start, drag } = useMouseStream(startCond);
  const [grabbed, setGrabbed] = useState<typeof hoveredNode | null>(null);

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
}
