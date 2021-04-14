import { useRef, useEffect } from "react";
import { useMouseEvent } from "./SVGContext";

export function useDoubleClick(time: number, callback: CallableFunction) {
  const e = useMouseEvent();

  const numRef = useRef<number>(0);

  const now = +new Date();
  useEffect(() => {
    if (e?.type === "mousedown") {
      if (numRef.current === 0) {
        numRef.current = now;
      } else {
        const elapsed = now - numRef.current;
        if (elapsed < time) {
          callback(e);
          numRef.current = 0;
        } else {
          numRef.current = now;
        }
      }
    }
  }, [e?.type]);
}
