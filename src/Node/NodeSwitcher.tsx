import React from "react";
import { Atom, useAtom } from "jotai";
import SliderNode from "./SliderNode";

import type { Node } from "./types";
import { isPrimitive } from "../util";

type NodeComponent = React.FC<{ node: Node }>;
const NodeSwitcher: NodeComponent = ({ node }) => {
  const [input] = useAtom(node.inputs[0].atom);

  const [num] = useAtom(node.output.atom as Atom<number>);
  const [rect] = useAtom(node.rect);
  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  return (
    <>
      <text {...center}>{typeof num === "number" && num}</text>
      {isPrimitive(input) &&
        typeof input === "number" &&
        typeof num === "number" && (
          <SliderNode
            inputAtom={input}
            outputAtom={node.output.atom as Atom<number>}
            rectAtom={node.rect}
          />
        )}
    </>
  );
};

export default React.memo(NodeSwitcher);
