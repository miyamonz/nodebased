import React from "react";
import { atom, useAtom } from "jotai";
import type { NodeAtom } from "./types";
import { useSelectedNodes } from "../Select";
import { InputCircle, OutputCircle } from "../Socket";

type NodeAtomComponent = React.FC<{ nodeAtom: NodeAtom }>;

function useRectAtom(nodeAtom: NodeAtom) {
  const [node] = useAtom(nodeAtom);
  const [rect] = useAtom(node.rect);
  return rect;
}

const ShowSelect: NodeAtomComponent = ({ nodeAtom }) => {
  const rect = useRectAtom(nodeAtom);
  const selectedNodes = useSelectedNodes();
  const isSelected = selectedNodes.includes(nodeAtom);

  if (isSelected) {
    return <rect {...rect} fill="lightpink" stroke="red" />;
  }
  return null;
};

export const hoveredNodeAtom = atom<NodeAtom | null>(null);
export function useHoveredNode() {
  const [node] = useAtom(hoveredNodeAtom);
  return node;
}

const ShowHovered: NodeAtomComponent = ({ nodeAtom }) => {
  const rect = useRectAtom(nodeAtom);
  const [hovered, setHovered] = useAtom(hoveredNodeAtom);
  const isHovered = nodeAtom === hovered;

  return (
    <>
      {isHovered && <rect {...rect} fill="none" stroke="red" />}
      <rect
        {...rect}
        fill="transparent"
        stroke={isHovered ? "none" : "black"}
        onMouseEnter={() => setHovered(nodeAtom)}
        onMouseMove={() => setHovered(nodeAtom)}
        onMouseLeave={() => setHovered(null)}
      />
    </>
  );
};

const RenderNode: NodeAtomComponent = ({ nodeAtom }) => {
  const [node] = useAtom(nodeAtom);
  const [rect] = useAtom(node.rect);

  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  const [outValue] = useAtom(node.output.atom);

  const [isockets] = useAtom(node.inputs);
  return (
    <>
      <ShowSelect nodeAtom={nodeAtom} />
      <text {...center}>
        {(typeof outValue === "number" || typeof outValue === "string") &&
          outValue}
      </text>
      <g transform={`translate(${rect.x} ${rect.y - 5} )`}>
        <text>{node.name}</text>
      </g>
      <ShowHovered nodeAtom={nodeAtom} />
      {node.component !== undefined && <node.component node={node} />}
      {isockets.map((input) => {
        return <InputCircle key={input.atom.toString()} input={input} />;
      })}
      {outValue !== undefined && <OutputCircle output={node.output} />}
    </>
  );
};

export default React.memo(RenderNode);
