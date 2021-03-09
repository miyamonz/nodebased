import { useMemo, useEffect } from "react";
import { useSetSelected } from "./atoms";
import { useMouseStream } from "../SVGContext";

export function useClickThenUnselect() {
  const setSelected = useSetSelected();
  const { start, drag, end } = useMouseStream();
  // on click
  const isClick = useMemo(() => {
    return start !== null && drag == null && end !== null;
  }, [start, drag, end]);
  useEffect(() => {
    if (isClick) {
      setSelected([]);
    }
  }, [isClick]);
}
