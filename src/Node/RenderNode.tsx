import React from "react";
import { atom, useAtom } from "jotai";
import type { Atom } from "jotai";
import { useAtomValue } from "jotai/utils";
import type { NodeJSON, NodeComponent } from "./types";
import { useSelectedNodes } from "../Select";
import { InputCircle, OutputCircle } from "../Socket";
import type { Position } from "../Position";

import { currentStreamsAtom } from "../Stream";

const ShowSelect: NodeComponent = ({ node }) => {
  const rect = useAtomValue(node._rect);
  const selectedNodes = useSelectedNodes();
  const isSelected = selectedNodes.includes(node);

  if (isSelected) {
    return <rect {...rect} fill="lightpink" stroke="red" />;
  }
  return null;
};

export const hoveredNode = atom<NodeJSON | null>(null);
export function useHoveredNode() {
  return useAtomValue(hoveredNode);
}

const ShowHovered: NodeComponent = ({ node }) => {
  const rect = useAtomValue(node._rect);
  const [hovered, setHovered] = useAtom(hoveredNode);
  const isHovered = node === hovered;

  return (
    <>
      {isHovered && <rect {...rect} fill="none" stroke="red" />}
      <rect
        {...rect}
        fill="transparent"
        stroke={isHovered ? "none" : "black"}
        onMouseEnter={() => setHovered(node)}
        onMouseMove={() => setHovered(node)}
        onMouseLeave={() => setHovered(null)}
      />
    </>
  );
};

const RenderText = ({
  outputAtom,
  center,
}: {
  outputAtom: Atom<unknown>;
  center: Position;
}) => {
  const outValue = useAtomValue(outputAtom);
  return (
    <text {...center}>
      {(typeof outValue === "number" || typeof outValue === "string") &&
        outValue}
    </text>
  );
};

function useStreamById(nodeId: NodeJSON["id"]) {
  const streamMap = useAtomValue(currentStreamsAtom);
  const stream = streamMap[nodeId];
  const inputs = useAtomValue(stream?.inputAtoms ?? atom(0));
  const outputs = useAtomValue(stream?.outputAtoms ?? atom(0));
  return { inputs, outputs };
}

const RenderNode: NodeComponent = ({ node }) => {
  const rect = useAtomValue(node._rect);

  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };

  const isockets = node.isockets;
  const osockets = node.osockets;

  //const { outputs } = useStreamById(node.id);

  return (
    <>
      <ShowSelect node={node} />
      <g transform={`translate(${rect.x} ${rect.y - 5} )`}>
        <text>{node.name}</text>
      </g>
      <ShowHovered node={node} />

      {node._component !== undefined && <node._component node={node} />}
      {node.name !== "inlet" &&
        isockets.map((input) => {
          return <InputCircle key={input.name} input={input} />;
        })}
      {node.name !== "outlet" &&
        osockets.map((output) => {
          return <OutputCircle key={output.name} output={output} />;
        })}
    </>
  );
};

export default React.memo(RenderNode);
