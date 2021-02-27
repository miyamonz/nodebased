import { useState, useEffect } from "react";
import { useMousePosition } from "./atoms";
import { useMouseEvent } from "./SVGContext";
import type { Position } from "../Position";

export function useMouseStream(
  startCond = true,
  dragCond = true,
  endCond = true
) {
  const [start, setStart] = useState<Position | null>(null);
  const [drag, setDrag] = useState<Position | null>(null);
  const [end, setEnd] = useState<Position | null>(null);
  const e = useMouseEvent();
  const position = useMousePosition();

  useEffect(() => {
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
    } else if (e.type === "mouseup" && endCond && start !== null) {
      setEnd(position);
    } else if (e.type === "mousemove" && end !== null) {
      setStart(null);
      setDrag(null);
      setEnd(null);
    }
  }, [e, start, drag, end]);

  return { start, drag, end };
}
