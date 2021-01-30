export type Operator = {
  name: string;
  fn: (...args: unknown[]) => unknown;
};

export function createOperator(
  name: string,
  fn: (...args: unknown[]) => unknown
): Operator {
  return {
    name,
    fn,
  };
}
