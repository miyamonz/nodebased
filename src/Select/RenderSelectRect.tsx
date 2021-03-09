import React from "react";
import { useSelectRectAtom, useMouseToSelect } from "./drag";
import { useClickThenUnselect } from "./useClickThenUnselect";

const RenderSelectRect = () => {
  useClickThenUnselect();
  useMouseToSelect();
  const rectProp = useSelectRectAtom();

  return <rect {...rectProp} fill="none" stroke={"red"} />;
};

export default React.memo(RenderSelectRect);
