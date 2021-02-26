import React from "react";
import { useMouseToSelect, useSelectRectAtom } from "./drag";

const RenderSelectRect = () => {
  const rectProp = useSelectRectAtom();
  useMouseToSelect();

  return <rect {...rectProp} fill="none" stroke={"red"} />;
};

export default React.memo(RenderSelectRect);
