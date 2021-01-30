import React from "react";
import { useAtom } from "jotai";
import type { Node } from "../atoms";
import { isConnected } from "../Socket";
import type { InputSocketConnected } from "../Socket";

const WhenConnected = ({ input }: { input: InputSocketConnected<number> }) => {
  const [pos] = useAtom(input.position);
  const [fromPos] = useAtom(input.from.position);
  const arm = Math.abs(fromPos.x - pos.x) / 3;

  return (
    <>
      {/*
      <line stroke="blue" x1={pos.x} y1={pos.y} x2={fromPos.x} y2={fromPos.y} />
      */}
      <path
        stroke="blue"
        fill="none"
        d={`M ${fromPos.x} ${fromPos.y} C ${fromPos.x + arm} ${fromPos.y}, ${
          pos.x - arm
        } ${pos.y}, ${pos.x} ${pos.y} `}
      />
    </>
  );
};

type NodeComponent<I, O> = React.FC<{ node: Node<I, O> }>;
const NullNode: NodeComponent<number, number> = ({
  node,
}: {
  node: Node<number, number>;
}) => {
  return <>{isConnected(node.input) && <WhenConnected input={node.input} />}</>;
};

export default NullNode;
