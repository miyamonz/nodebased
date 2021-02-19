import React from "react";
import { useAtom } from "jotai";

import type { Node } from "./types";

type NodeComponent = React.FC<{ node: Node }>;
const NodeSwitcher: NodeComponent = ({ node }) => {
  const [num] = useAtom(node.output.atom);
  const [rect] = useAtom(node.rect);
  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  return (
    <>
      <text {...center}>
        {(typeof num === "number" || typeof num === "string") && num}
      </text>
      {node.op.component !== undefined && <node.op.component node={node} />}
    </>
  );
};

export default React.memo(NodeSwitcher);
