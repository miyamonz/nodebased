import React from "react";
import { atom, useAtom } from "jotai";
import { selectedNodesAtom, selectedGraphAtom } from "./atoms";
import { useCopyToClipboard } from "./atoms";
import { boundingRect, offsetRect } from "../Rect";

import { useRemoveNode, useAppendNode } from "../actions";

import { useCreateGraphNode } from "../GraphNode";

import { useShortcutCopy } from "./shortcutHooks";

const boundingRectAtom = atom((get) => {
  const selectedRectAtoms = get(selectedNodesAtom);
  return boundingRect(selectedRectAtoms.map((node) => get(node.rect)));
});

function useRemoveSelected() {
  const [nodes, setNodes] = useAtom(selectedNodesAtom);
  const remove = useRemoveNode();
  const removeCallback = React.useCallback(() => {
    remove(nodes);
    setNodes([]);
  }, [nodes]);

  return removeCallback;
}

const RenderBoundingRect = () => {
  const [nodes] = useAtom(selectedNodesAtom);
  if (nodes.length === 0) return null;
  return <RenderBoundingRectImpl />;
};

const RenderBoundingRectImpl = () => {
  const [graph] = useAtom(selectedGraphAtom);
  const append = useAppendNode();
  const removeSelected = useRemoveSelected();
  const copyToClipboard = useCopyToClipboard();
  const createGraphNode = useCreateGraphNode();
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
    {
      name: "sub node",
      onMouseUp: () => {
        createGraphNode(graph).then(append);
      },
      fill: "green",
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
