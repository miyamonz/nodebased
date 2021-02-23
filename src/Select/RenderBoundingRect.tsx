import React from "react";
import { atom, useAtom } from "jotai";
import { selectedRectAtomListAtom } from "./drag";
import { boundingRect, offsetRect } from "../Rect";
import { removeNodeAtom } from "../Node";

const boundingRectAtom = atom((get) => {
  const selectedRectAtoms = get(selectedRectAtomListAtom);
  return boundingRect(selectedRectAtoms.map(get).map((node) => get(node.rect)));
});
const RenderBoundingRect = () => {
  const [nodeAtoms, setNodeAtoms] = useAtom(selectedRectAtomListAtom);

  const [boundingRect] = useAtom(boundingRectAtom);
  const [, removeNode] = useAtom(removeNodeAtom);
  const r = offsetRect(boundingRect)(15);

  const u = 20;
  if (nodeAtoms.length === 0) return null;
  return (
    <>
      <rect
        x={r.x + r.width - u}
        y={r.y - u}
        width={u}
        height={u}
        fill="lightblue"
        onMouseUp={() => {
          removeNode(nodeAtoms);
          setNodeAtoms([]);
        }}
      />
      <rect {...r} fill="lightblue" stroke="blue" />
    </>
  );
};

export default React.memo(RenderBoundingRect);
