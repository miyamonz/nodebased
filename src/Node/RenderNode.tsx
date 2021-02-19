import React from "react";
import { useAtom } from "jotai";
import { dragTargetAtom } from "../Drag";
import type { NodeAtom } from "./types";
import NodeSwitcher from "./NodeSwitcher";
import { InputCircle, OutputCircle } from "../Socket";

const RenderNode = ({ atom }: { atom: NodeAtom }) => {
  const [node] = useAtom(atom);
  const [rectProp] = useAtom(node.rect);
  const [dragTarget, setDragTarget] = useAtom(dragTargetAtom);
  const isDragTarget = atom === dragTarget;

  const [outValue] = useAtom(node.output.atom);
  return (
    <>
      <rect
        {...rectProp}
        fill="transparent"
        stroke="black"
        onMouseDown={() => {
          setDragTarget(atom);
        }}
      />
      <g transform={`translate(${rectProp.x} ${rectProp.y - 5} )`}>
        <text>{node.op.name}</text>
      </g>
      {isDragTarget && <rect {...rectProp} fill="none" stroke="red" />}
      <NodeSwitcher node={node} />

      {node.inputs.map((input) => {
        return <InputCircle key={input.atom.toString()} input={input} />;
      })}
      {outValue !== undefined && <OutputCircle output={node.output} />}
    </>
  );
};

export default React.memo(RenderNode);
