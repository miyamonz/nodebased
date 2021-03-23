import { atom } from "jotai";
import { NodeDefinition, ValueType } from "./types";
import type { NodeComponent } from "../Node";
import { createStream, Stream } from "../Stream";
import { createAtomRef } from "../AtomRef";
import type { Position } from "../Position";

const range = (num: number) => [...Array(num).keys()];

export function createStreamFromFn(
  fn: (...args: unknown[]) => unknown,
  inputsType: ValueType[],
  outputType?: ValueType
): Stream {
  const num = fn.length;
  const inputAtoms = range(num).map(() => createAtomRef(atom(0)));
  return createStream(inputAtoms, (inputs) =>
    atom((get) => fn(...get(inputs)))
  );
}

//TODO runtime type やったらoutput value は推論させたい
type OptionFn = {
  name: string;
  inputsType: ValueType[];
  outputType?: ValueType;

  component?: NodeComponent;
  fn: (...args: any[]) => unknown;
};
const nodes: OptionFn[] = [
  {
    name: "add",
    inputsType: ["any", "any"],
    outputType: "any",
    fn: (a, b) => a + b,
  },
  {
    name: "sub",
    inputsType: ["any", "any"],
    outputType: "any",
    fn: (a, b) => a - b,
  },
  {
    name: "mul",
    inputsType: ["any", "any"],
    outputType: "any",
    fn: (a, b) => a * b,
  },
  {
    name: "div",
    inputsType: ["any", "any"],
    outputType: "any",
    fn: (a, b) => a / b,
  },
  {
    name: "minus",
    inputsType: ["number"],
    outputType: "number",
    fn: (a) => -a,
  },
  {
    name: "and",
    inputsType: ["boolean", "boolean"],
    outputType: "boolean",
    fn: (a, b) => a && b,
  },
  {
    name: "or",
    inputsType: ["boolean", "boolean"],
    outputType: "boolean",
    fn: (a, b) => a || b,
  },
  {
    name: "not",
    inputsType: ["boolean"],
    outputType: "boolean",
    fn: (a) => !a,
  },
  {
    name: "sin",
    inputsType: ["number"],
    outputType: "number",
    fn: (a) => Math.sin(a),
  },
  {
    name: "cos",
    inputsType: ["number"],
    outputType: "number",
    fn: (a) => Math.cos(a),
  },
  {
    name: "floor",
    inputsType: ["number"],
    outputType: "number",
    fn: (a: number) => Math.floor(a),
  },
  {
    name: "abs",
    inputsType: ["number"],
    outputType: "number",
    fn: (a: number) => Math.abs(a),
  },
  {
    name: "min",
    inputsType: ["number", "number"],
    outputType: "number",
    fn: (a: number, b: number) => Math.min(a, b),
  },
  {
    name: "max",
    inputsType: ["number", "number"],
    outputType: "number",
    fn: (a: number, b: number) => Math.max(a, b),
  },
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
      const stream = createStreamFromFn(fn, inputsType, outputType);
      return {
        stream,
        ...rest,
      };
    },
  };
});

export { converted as fnNodes };
