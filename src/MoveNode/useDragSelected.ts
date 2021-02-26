import { useEffect } from "react";
import { useAtom } from "jotai";
import { selectedRectAtomListAtom } from "../Select/drag";
import { useMouseStream } from "../SVGContext";
import { setGrabAtom, setDragDiffAtom } from "./drag";

export function useDragSelected() {
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
