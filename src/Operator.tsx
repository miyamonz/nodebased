import React from "react";
import type { Node } from "./Node";
export type Operator = {
  name: string;
  fn: (...args: unknown[]) => unknown;
  component: React.FC<{ node: Node }>;
};

const defaultNode = () => <></>;

export function createOperator(
  name: string,
  fn: (...args: unknown[]) => unknown,
  component: Operator["component"] = defaultNode
): Operator {
  return {
    name,
    fn,
    component,
  };
}
