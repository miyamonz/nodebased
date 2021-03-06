import React from "react";
import { useMouseToSelect } from "./drag";
import { useSelectRectAtom } from "./atoms";

const RenderSelectRect = () => {
  const rectProp = useSelectRectAtom();
  useMouseToSelect();

  return <rect {...rectProp} fill="none" stroke={"red"} />;
};

export default React.memo(RenderSelectRect);
