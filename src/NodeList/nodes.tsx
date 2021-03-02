import { atom } from "jotai";
import { SliderNode, RenderElementNode } from "./";
import { NodeComponent } from "../Node";
import { defaultNodeSizeVariable } from "../Node";
import { socketRadiusVariable } from "../Socket";
import { createVariable, Variable } from "../Variable";

import { createVariableFromFn } from "./funcs";

type OptionBase = {
  name: string;
  component?: NodeComponent;
};
type OptionFn = OptionBase & {
  fn: (...args: any[]) => unknown;
};
type OptionVariable = OptionBase & {
  variable: () => Variable<unknown[], unknown>;
};

const fnNodes: OptionFn[] = [
  { name: "slider", fn: (x) => x, component: SliderNode },
  { name: "add", fn: (a, b) => a + b },
  { name: "sub", fn: (a, b) => a - b },
  { name: "mul", fn: (a, b) => a * b },
  { name: "div", fn: (a, b) => a / b },
  { name: "minus", fn: (a) => -a },
  { name: "sin", fn: (a) => Math.sin(a) },
  { name: "cos", fn: (a) => Math.cos(a) },
  { name: "clamp", fn: (a, min, max) => Math.max(min, Math.min(max, a)) },
  {
    name: "square",
    fn: (x, y, r) => <rect x={x} y={y} width={r} height={r} fill="blue" />,
  },
  { name: "render", fn: (_) => {}, component: RenderElementNode },
];

export const nodeOptions: OptionVariable[] = [
  ...fnNodes.map((option) => {
    const { name, component, fn } = option;

    const variable = createVariableFromFn(fn) as Variable<unknown[], unknown>;
    return { name, component, variable: () => variable };
  }),
  {
    name: "nodeSize",
    variable: () => defaultNodeSizeVariable as any,
  },
  {
    name: "socketRadius",
    variable: () => socketRadiusVariable as any,
  },
  {
    name: "elapsed",
    variable: () =>
      createVariable(atom([]), () => {
        const oscAtom = atom(0);
        console.log("atom created");
        oscAtom.onMount = (set) => {
          const id = setInterval(() => set((prev) => prev + 1));
          return () => clearInterval(id);
        };

        return oscAtom;
      }),
  },
];
