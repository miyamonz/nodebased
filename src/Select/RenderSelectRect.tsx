import React from "react";
import { useAtom } from "jotai";
import { useSelectRectAtom, isDraggingAtom } from "./drag";

const RenderSelectRect = () => {
  const rectProp = useSelectRectAtom();
  const [isDragging] = useAtom(isDraggingAtom);
  if (isDragging) return <rect {...rectProp} fill="none" stroke="red" />;
  return null;
};

export default React.memo(RenderSelectRect);