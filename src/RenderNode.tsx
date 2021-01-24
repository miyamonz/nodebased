import React from "react";
import { useAtom } from "jotai";
import { dragTargetAtom } from "./atoms";
import { connectTargetAtom, hoveredInputSocketAtom } from "./atoms";
import type { NodeAtom, PositionAtom } from "./atoms";
import SliderNode from "./SliderNode";

const IOCircle = React.memo(
  ({
    positionAtom,
    ...props
  }: {
    positionAtom: PositionAtom;
    [x: string]: any;
  }) => {
    const [position] = useAtom(positionAtom);
    return (
      <circle
        {...props}
        cx={position.x}
        cy={position.y}
        fill="white"
        stroke="blue"
        r={7}
      />
    );
  }
);

const RenderNode = ({ atom }: { atom: NodeAtom }) => {
  const [node] = useAtom(atom);
  const [rectProp] = useAtom(node.rect);
  const [dragTarget, setDragTarget] = useAtom(dragTargetAtom);
  const [, setConnectTarget] = useAtom(connectTargetAtom);
  const [, setHovered] = useAtom(hoveredInputSocketAtom);
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
      {isTarget && <rect {...rectProp} fill="none" stroke="red" />}
      <SliderNode node={node} />
      <IOCircle
        positionAtom={node.input.position}
        onMouseEnter={() => {
          setHovered(node.input);
        }}
        onMouseLeave={() => {
          setHovered(null);
        }}
      />
      <IOCircle
        positionAtom={node.output.position}
        onMouseDown={() => {
          setConnectTarget(node.output);
        }}
      />
    </>
  );
};

export default React.memo(RenderNode);
