import React from "react";
import type { Node } from "./Node";
export type Operator = {
  component: React.FC<{ node: Node }>;
};

const defaultNode = () => <></>;

export function createOperator(
  component: Operator["component"] = defaultNode
): Operator {
  return {
    component,
  };
}
