import React from "react";
import { atom, useAtom } from "jotai";
import { selectedNodesAtom } from "./drag";
import { boundingRect, offsetRect } from "../Rect";

import { removeNodeAtom, createSubNodeAtom } from "../actions";

const boundingRectAtom = atom((get) => {
  const selectedRectAtoms = get(selectedNodesAtom);
  return boundingRect(selectedRectAtoms.map(get).map((node) => get(node.rect)));
});
const RenderBoundingRect = () => {
  const [nodeAtoms, setNodeAtoms] = useAtom(selectedNodesAtom);

  const [boundingRect] = useAtom(boundingRectAtom);
  const [, removeNode] = useAtom(removeNodeAtom);
  const [, createSubNode] = useAtom(createSubNodeAtom);
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
      <rect
        x={r.x + r.width - u * 2}
        y={r.y - u}
        width={u}
        height={u}
        fill="lightgreen"
        onMouseUp={() => {
          createSubNode(nodeAtoms);
          setNodeAtoms([]);
        }}
      />
      <rect {...r} fill="lightblue" stroke="blue" />
    </>
  );
};

export default React.memo(RenderBoundingRect);
