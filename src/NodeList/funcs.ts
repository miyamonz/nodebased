import { atom } from "jotai";
import { NodeDefinition, ValueType } from "./types";
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

//TODO runtime type やったらoutput value は推論させたい
type OptionFn = {
  name: string;
  inputsType?: ValueType[];
  outputType?: ValueType;

  component?: NodeComponent;
  fn: (...args: any[]) => unknown;
};
const nodes: OptionFn[] = [
  { name: "add", fn: (a, b) => a + b },
  { name: "sub", fn: (a, b) => a - b },
  { name: "mul", fn: (a, b) => a * b },
  { name: "div", fn: (a, b) => a / b },
  { name: "minus", fn: (a) => -a },
  { name: "not", fn: (a) => !a },
  { name: "sin", fn: (a) => Math.sin(a) },
  { name: "cos", fn: (a) => Math.cos(a) },
  { name: "floor", fn: (a: number) => Math.floor(a) },
  { name: "abs", fn: (a: number) => Math.abs(a) },
  { name: "min", fn: (a: number, b: number) => Math.min(a, b) },
  { name: "max", fn: (a: number, b: number) => Math.max(a, b) },
  {
    name: "add vec2",
    inputsType: ["Position", "Position"],
    outputType: "Position",
    fn: (a: Position, b: Position) => ({ x: a?.x + b?.x, y: a?.y + b?.y }),
  },
  {
    name: "sub vec2",
    inputsType: ["Position", "Position"],
    outputType: "Position",
    fn: (a: Position, b: Position) => ({ x: a?.x - b?.x, y: a?.y - b?.y }),
  },
  {
    name: "magnitude",
    inputsType: ["Position"],
    outputType: "number",
    fn: (a: Position) => Math.sqrt(a.x ** 2 + a.y ** 2),
  },
  {
    name: "console.log",
    inputsType: ["any"],
    fn: (_) => {
      console.log(_);
    },
  },
];
const converted: NodeDefinition[] = nodes.map((option) => {
  const { name, fn, inputsType, outputType, ...rest } = option;
  return {
    name,
    inputs: inputsType?.map((t) => ({ type: t })),
    outputs:
      typeof outputType !== "undefined" ? [{ type: outputType }] : undefined,
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
