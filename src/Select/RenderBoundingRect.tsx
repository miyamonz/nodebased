import React from "react";
import { atom, useAtom } from "jotai";
import { selectedRectAtomListAtom } from "./drag";
import { boundingRect, offsetRect } from "../Rect";

const boundingRectAtom = atom((get) => {
  const selectedRectAtoms = get(selectedRectAtomListAtom);
  return boundingRect(selectedRectAtoms.map(get).map((node) => get(node.rect)));
});
const RenderBoundingRect = () => {
  const [boundingRect] = useAtom(boundingRectAtom);
  const r = offsetRect(boundingRect)(10);
  return <rect {...r} fill="lightblue" stroke="blue" />;
};

export default React.memo(RenderBoundingRect);
