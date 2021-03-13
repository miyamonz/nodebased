import { atom } from "jotai";
import type { NodeComponent } from "../Node";
import { createVariable } from "../Variable";
import { createAtomRef } from "../AtomRef";
import type { Position } from "../Position";

const range = (num: number) => [...Array(num).keys()];

export function createVariableFromFn(fn: (...args: unknown[]) => unknown) {
  const num = fn.length;
  const inputAtoms = range(num).map(() => createAtomRef(atom(0)));
  return createVariable(inputAtoms, (inputs) =>
    atom((get) => fn(...get(inputs)))
  );
}

type OptionFn = {
  name: string;
  component?: NodeComponent;
  fn: (...args: any[]) => unknown;
};
const nodes: OptionFn[] = [
  { name: "add", fn: (a, b) => a + b },
  { name: "sub", fn: (a, b) => a - b },
  { name: "mul", fn: (a, b) => a * b },
  { name: "div", fn: (a, b) => a / b },
  { name: "minus", fn: (a) => -a },
  { name: "sin", fn: (a) => Math.sin(a) },
  { name: "cos", fn: (a) => Math.cos(a) },
  { name: "floor", fn: (a: number) => Math.floor(a) },
  { name: "abs", fn: (a: number) => Math.abs(a) },
  { name: "min", fn: (a: number, b: number) => Math.min(a, b) },
  { name: "max", fn: (a: number, b: number) => Math.max(a, b) },
  {
    name: "add vec2",
    fn: (a: Position, b: Position) => ({ x: a?.x + b?.x, y: a?.y + b?.y }),
  },
  {
    name: "sub vec2",
    fn: (a: Position, b: Position) => ({ x: a?.x - b?.x, y: a?.y - b?.y }),
  },
  { name: "magnitude", fn: (a: Position) => Math.sqrt(a.x ** 2 + a.y ** 2) },
  {
    name: "console.log",
    fn: (_) => {
      console.log(_);
    },
  },
];
const converted = nodes.map((option) => {
  const { name, fn, ...rest } = option;
  return {
    name,
    init: () => {
      const variable = createVariableFromFn(fn);
      return {
        variable,
        ...rest,
      };
    },
  };
});

export { converted as fnNodes };
