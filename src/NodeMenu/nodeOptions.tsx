import { atom } from "jotai";
import { SliderNode, RenderElementNode } from "../NodeList";
import { NodeComponent } from "../Node";
import { defaultNodeSizeVariable } from "../Node";
import { createVariable, Variable } from "../Variable";

type OptionBase = {
  name: string;
  component?: NodeComponent;
};
type OptionFn = OptionBase & {
  fn: (...args: any[]) => unknown;
};
type OptionVariable = OptionBase & {
  variable: () => Variable<number, unknown>;
};
export type Option = OptionFn | OptionVariable;
export const nodeOptions: Option[] = [
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
  {
    name: "nodeSize",
    variable: () => defaultNodeSizeVariable,
  },
  {
    name: "elapsed",
    variable: () =>
      createVariable([], () => {
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
