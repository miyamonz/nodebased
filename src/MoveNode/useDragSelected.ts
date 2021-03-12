import { useEffect } from "react";
import { useAtom } from "jotai";
import { useSelectedNodes } from "../Select";
import { useMouseStream } from "../SVGContext";
import { setGrabAtom, setDragDiffAtom } from "./drag";

export function useDragSelected() {
  const dragTarget = useSelectedNodes();
  const { start, drag } = useMouseStream(
    dragTarget !== null,
    dragTarget !== null
  );

  const [, setGrab] = useAtom(setGrabAtom);
  useEffect(() => {
    if (start === null) return;
    setGrab(dragTarget);
  }, [start?.x, start?.y]);
  const [, setDragDiff] = useAtom(setDragDiffAtom);

  useEffect(() => {
    if (start === null || drag === null) return;
    const mouseDiff = { x: drag.x - start.x, y: drag.y - start.y };
    setDragDiff([mouseDiff, dragTarget]);
  }, [drag?.x, drag?.y]);
}
