import React from "react";
import { useAtom } from "jotai";
import SliderNode from "./SliderNode";

import type { Node } from "./types";
import { isPrimitive } from "../util";

type NodeComponent<I, O> = React.FC<{ node: Node<I, O> }>;
const NodeSwitcher: NodeComponent<number, number> = ({ node }) => {
  const [input] = useAtom(node.inputs[0].atom);

  const [num] = useAtom(node.output.atom);
  const [rect] = useAtom(node.rect);
  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  return (
    <>
      <text {...center}>{num}</text>
      {isPrimitive(input) && (
        <SliderNode
          inputAtom={input}
          outputAtom={node.output.atom}
          rectAtom={node.rect}
        />
      )}
    </>
  );
};

export default React.memo(NodeSwitcher);
