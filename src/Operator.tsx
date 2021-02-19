import React from "react";
export type Operator = {
  name: string;
  fn: (...args: unknown[]) => unknown;
  component: React.ComponentType;
};

const defaultNode = () => <></>;

export function createOperator(
  name: string,
  fn: (...args: unknown[]) => unknown,
  component: React.ComponentType = defaultNode
): Operator {
  return {
    name,
    fn,
    component,
  };
}
