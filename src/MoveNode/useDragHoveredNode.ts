import { useEffect } from "react";
import { useAtom } from "jotai";
import { hoveredNodeAtom } from "../Node";
import { useMouseStream } from "../SVGContext";

import { setGrabAtom, setDragDiffAtom } from "./drag";

export function useDragHoveredNode() {
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
