import React from "react";
import { useAtom } from "jotai";
import { dragTargetAtom } from "./atoms";
import type { NodeAtom } from "./atoms";
import SliderComponent from "./SliderNode";

const IOCircle = ({ cx, cy }: { cx: number; cy: number }) => {
  return <circle cx={cx} cy={cy} fill="white" stroke="blue" r={5} />;
};

const RenderNode = ({ atom }: { atom: NodeAtom }) => {
  const [node] = useAtom(atom);
  const [target, setTarget] = useAtom(dragTargetAtom);
  const isTarget = atom === target;
  return (
    <>
      <rect
        {...node.rect}
        fill="transparent"
        stroke="black"
        onMouseDown={() => {
          setTarget(atom);
        }}
      />
      {isTarget && <rect {...node.rect} fill="none" stroke="red" />}
      <SliderComponent inputAtom={node.input} rect={node.rect} />
      <IOCircle cx={node.rect.x} cy={node.rect.y + node.rect.height / 2} />
      <IOCircle
        cx={node.rect.x + node.rect.width}
        cy={node.rect.y + node.rect.height / 2}
      />
    </>
  );
};

export default React.memo(RenderNode);
