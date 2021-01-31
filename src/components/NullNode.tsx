import React from "react";
import type { Node } from "../atoms";

type NodeComponent<I, O> = React.FC<{ node: Node<I, O> }>;
const NullNode: NodeComponent<number, number> = ({
  node,
}: {
  node: Node<number, number>;
}) => {
  return null;
};

export default NullNode;
