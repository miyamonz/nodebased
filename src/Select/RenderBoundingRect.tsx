import React from "react";
import { atom, useAtom } from "jotai";
import { selectedNodesAtom } from "./atoms";
import { useCopyToClipboard } from "./atoms";
import { boundingRect, offsetRect } from "../Rect";

import { removeNodeAtom } from "../actions";

import { useShortcutCopy } from "./shortcutHooks";

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
  if (nodeAtoms.length === 0) return null;
  return <RenderBoundingRectImpl />;
};

const RenderBoundingRectImpl = () => {
  const removeSelected = useRemoveSelected();
  const copyToClipboard = useCopyToClipboard();
  useShortcutCopy(
    React.useCallback(() => {
      copyToClipboard();
    }, [])
  );
  const buttons = [
    {
      name: "remove",
      onMouseUp: removeSelected,
      fill: "lightblue",
    },
    {
      name: "copy",
      onMouseUp: copyToClipboard,
      fill: "orange",
    },
  ];

  const [boundingRect] = useAtom(boundingRectAtom);
  const r = offsetRect(boundingRect)(15);
  const u = 20;

  return (
    <>
      {buttons.map((b, i) => (
        <rect
          key={b.name}
          x={r.x + r.width - u * (i + 1)}
          y={r.y - u}
          width={u}
          height={u}
          fill={b.fill}
          onMouseUp={b.onMouseUp}
        />
      ))}
      <rect {...r} fill="lightblue" stroke="blue" />
    </>
  );
};

export default React.memo(RenderBoundingRect);
