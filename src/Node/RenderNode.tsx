import React from "react";
import { atom, useAtom } from "jotai";
import type { Node } from "./types";
import { useSelectedNodes } from "../Select";
import { InputCircle, OutputCircle } from "../Socket";
import type { OutputSocket } from "../Socket";

type NodeComponent = React.FC<{ node: Node }>;

function useRectAtom(node: Node) {
  const [rect] = useAtom(node.rect);
  return rect;
}

const ShowSelect: NodeComponent = ({ node }) => {
  const rect = useRectAtom(node);
  const selectedNodes = useSelectedNodes();
  const isSelected = selectedNodes.includes(node);

  if (isSelected) {
    return <rect {...rect} fill="lightpink" stroke="red" />;
  }
  return null;
};

export const hoveredNode = atom<Node | null>(null);
export function useHoveredNode() {
  const [node] = useAtom(hoveredNode);
  return node;
}

const ShowHovered: NodeComponent = ({ node }) => {
  const rect = useRectAtom(node);
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

const RenderNode: NodeComponent = ({ node }) => {
  const [rect] = useAtom(node.rect);

  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  const [outValue] = useAtom(node.outputs[0].atom);

  const isockets = node.inputs;
  return (
    <>
      <ShowSelect node={node} />
      <text {...center}>
        {(typeof outValue === "number" || typeof outValue === "string") &&
          outValue}
      </text>
      <g transform={`translate(${rect.x} ${rect.y - 5} )`}>
        <text>{node.name}</text>
      </g>
      <ShowHovered node={node} />
      {node.component !== undefined && <node.component node={node} />}
      {isockets.map((input) => {
        return <InputCircle key={input.atom.toString()} input={input} />;
      })}
      {node.outputs.map((socket) => (
        <RenderOutSocket key={socket.atom.toString()} socket={socket} />
      ))}
    </>
  );
};

function RenderOutSocket({ socket }: { socket: OutputSocket<unknown> }) {
  const [outValue] = useAtom(socket.atom);
  return <>{outValue !== undefined && <OutputCircle output={socket} />}</>;
}

export default React.memo(RenderNode);
