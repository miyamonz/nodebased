import React from "react";
import { useAtom } from "jotai";
import { dragTargetAtom } from "../atoms";
import type { NodeAtom } from "./atoms";
import SliderNode from "./SliderNode";
import { InputCircle, OutputCircle } from "./IOCircle";

const RenderNode = ({ atom }: { atom: NodeAtom<number, number> }) => {
  const [node] = useAtom(atom);
  const [rectProp] = useAtom(node.rect);
  const [dragTarget, setDragTarget] = useAtom(dragTargetAtom);
  const isTarget = atom === dragTarget;
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
      <g transform={`translate(${rectProp.x} ${rectProp.y} )`}>
        <text>{node.op.name}</text>
      </g>
      {isTarget && <rect {...rectProp} fill="none" stroke="red" />}
      <SliderNode node={node} />

      {node.inputs.map((input, i) => {
        return <InputCircle key={input.atom.toString()} input={input} />;
      })}
      <OutputCircle output={node.output} />
    </>
  );
};

export default React.memo(RenderNode);
