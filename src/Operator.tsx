import React from "react";
import type { Node } from "./Node";
export type Operator = {
  name: string;
  component: React.FC<{ node: Node }>;
};

const defaultNode = () => <></>;

export function createOperator(
  name: string,
  component: Operator["component"] = defaultNode
): Operator {
  return {
    name,
    component,
  };
}
