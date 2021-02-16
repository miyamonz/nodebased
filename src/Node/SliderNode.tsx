import React from "react";
import { RectProp } from "../types";
import { useAtom } from "jotai";
import { Atom, PrimitiveAtom } from "jotai";

import type { Node } from "../Node/atoms";

import { isPrimitive } from "../util";

const SliderComponent = ({
  inputAtom,
  outputAtom,
  rectAtom,
}: {
  inputAtom: PrimitiveAtom<number>;
  outputAtom: Atom<number>;
  rectAtom: PrimitiveAtom<RectProp>;
}) => {
  const [, setInput] = useAtom(inputAtom);
  const [num] = useAtom(outputAtom);
  const [rect] = useAtom(rectAtom);
  return (
    <>
      <foreignObject {...rect} y={rect.y + rect.height}>
        <input
          type="range"
          min={0}
          max={100}
          value={num}
          onChange={(e) => setInput(parseInt(e.target.value, 10))}
        />
      </foreignObject>
    </>
  );
};

type NodeComponent<I, O> = React.FC<{ node: Node<I, O> }>;
const SliderNode: NodeComponent<number, number> = ({ node }) => {
  const [input] = useAtom(node.inputs[0].atom);

  const [num] = useAtom(node.output.atom);
  const [rect] = useAtom(node.rect);
  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  return (
    <>
      <text {...center}>{num} </text>
      {isPrimitive(input) && (
        <SliderComponent
          inputAtom={input}
          outputAtom={node.output.atom}
          rectAtom={node.rect}
        />
      )}
    </>
  );
};

export default SliderNode;
