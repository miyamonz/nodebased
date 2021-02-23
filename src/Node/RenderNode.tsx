import React from "react";
import { useAtom } from "jotai";
import { hoveredNodeAtom } from "./atoms";
import type { NodeAtom, NodeComponent } from "./types";
import { selectedRectAtomListAtom } from "../Select/drag";
import { InputCircle, OutputCircle } from "../Socket";

type NodeAtomComponent = React.FC<{ nodeAtom: NodeAtom }>;

const ShowSelect: NodeAtomComponent = ({ nodeAtom }) => {
  const [node] = useAtom(nodeAtom);
  const [rect] = useAtom(node.rect);
  const [selectedNodes] = useAtom(selectedRectAtomListAtom);
  const isSelected = selectedNodes.includes(nodeAtom);

  if (isSelected) {
    return <rect {...rect} fill="lightpink" stroke="red" />;
  }
  return null;
};

const ShowHovered: NodeAtomComponent = ({ nodeAtom }) => {
  const [node] = useAtom(nodeAtom);
  const [rect] = useAtom(node.rect);
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

const RenderNode: React.FC<{ nodeAtom: NodeAtom }> = ({ nodeAtom }) => {
  const [node] = useAtom(nodeAtom);
  const [rect] = useAtom(node.rect);

  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  const [outValue] = useAtom(node.output.atom);
  return (
    <>
      <ShowSelect nodeAtom={nodeAtom} />
      <text {...center}>
        {(typeof outValue === "number" || typeof outValue === "string") &&
          outValue}
      </text>
      <ShowHovered nodeAtom={nodeAtom} />
      <g transform={`translate(${rect.x} ${rect.y - 5} )`}>
        <text>{node.name}</text>
      </g>
      <>{node.component !== undefined && <node.component node={node} />}</>
      {node.inputs.map((input) => {
        return <InputCircle key={input.atom.toString()} input={input} />;
      })}
      {outValue !== undefined && <OutputCircle output={node.output} />}
    </>
  );
};

export default React.memo(RenderNode);
