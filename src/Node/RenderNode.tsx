import React from "react";
import { useAtom } from "jotai";
import { hoveredNodeAtom } from "./atoms";
import type { NodeAtom } from "./types";
import NodeSwitcher from "./NodeSwitcher";
import { dragTargetAtom } from "../MoveNode";
import { InputCircle, OutputCircle } from "../Socket";

const RenderNode: React.FC<{ nodeAtom: NodeAtom }> = ({ nodeAtom }) => {
  const [node] = useAtom(nodeAtom);
  const [rectProp] = useAtom(node.rect);
  const [hovered, setHovered] = useAtom(hoveredNodeAtom);
  const [dragTarget] = useAtom(dragTargetAtom);
  const isHovered = nodeAtom === hovered;
  const isDragTarget = dragTarget?.includes(nodeAtom);

  const [outValue] = useAtom(node.output.atom);
  return (
    <>
      {isDragTarget && <rect {...rectProp} fill="none" stroke="red" />}
      {isHovered && <rect {...rectProp} fill="none" stroke="red" />}
      <rect
        {...rectProp}
        fill="transparent"
        stroke={isHovered ? "none" : "black"}
        onMouseEnter={() => setHovered(nodeAtom)}
        onMouseLeave={() => setHovered(null)}
      />
      <g transform={`translate(${rectProp.x} ${rectProp.y - 5} )`}>
        <text>{node.name}</text>
      </g>
      <NodeSwitcher node={node} />

      {node.inputs.map((input) => {
        return <InputCircle key={input.atom.toString()} input={input} />;
      })}
      {outValue !== undefined && <OutputCircle output={node.output} />}
    </>
  );
};

export default React.memo(RenderNode);
