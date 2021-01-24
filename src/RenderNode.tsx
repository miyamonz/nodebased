import React from "react";
import { useAtom } from "jotai";
import { dragTargetAtom, connectTargetAtom } from "./atoms";
import type { NodeAtom, PositionAtom } from "./atoms";
import SliderComponent from "./SliderNode";

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
  const [target, setTarget] = useAtom(dragTargetAtom);
  const [, setConnectTarget] = useAtom(connectTargetAtom);
  const isTarget = atom === target;
  return (
    <>
      <rect
        {...rectProp}
        fill="transparent"
        stroke="black"
        onMouseDown={() => {
          setTarget(atom);
        }}
      />
      {isTarget && <rect {...rectProp} fill="none" stroke="red" />}
      <SliderComponent inputAtom={node.input.atom} rectAtom={node.rect} />
      <IOCircle positionAtom={node.input.position} />
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
