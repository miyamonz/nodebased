import React from "react";
import { atom, useAtom } from "jotai";
import { selectedNodesAtom } from "./atoms";
import { useCopyToClipboard } from "./atoms";
import { boundingRect, offsetRect } from "../Rect";

import { removeNodeAtom } from "../actions";

const boundingRectAtom = atom((get) => {
  const selectedRectAtoms = get(selectedNodesAtom);
  return boundingRect(selectedRectAtoms.map(get).map((node) => get(node.rect)));
});

function useRemoveSelected() {
  const [nodeAtoms, setNodeAtoms] = useAtom(selectedNodesAtom);
  const [, removeNode] = useAtom(removeNodeAtom);
  const removeCallback = React.useCallback(() => {
    removeNode(nodeAtoms);
    setNodeAtoms([]);
  }, [nodeAtoms]);

  return removeCallback;
}
const RenderBoundingRect = () => {
  const [nodeAtoms] = useAtom(selectedNodesAtom);
  const removeSelected = useRemoveSelected();
  const copyToClipboard = useCopyToClipboard();

  const [boundingRect] = useAtom(boundingRectAtom);
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
        onMouseUp={removeSelected}
      />
      <rect
        x={r.x + r.width - u * 2}
        y={r.y - u}
        width={u}
        height={u}
        fill="orange"
        onMouseUp={copyToClipboard}
      />
      <rect {...r} fill="lightblue" stroke="blue" />
    </>
  );
};

export default React.memo(RenderBoundingRect);
