import { atom } from "jotai";
import { SliderNode, RenderElementNode, RenderButtonNode } from "./components";
import { NodeComponent } from "../Node";
import type { CreateNodeProps } from "../actions";

// variables
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

type Option = {
  name: string;
  init: () => Omit<CreateNodeProps, "position" | "name">;
};
const converted = fnNodes.map((option) => {
  const { name, fn, ...rest } = option;
  return {
    name,
    init: () => {
      const variable = createVariableFromFn(fn) as Variable<unknown[], unknown>;
      return {
        variable,
        ...rest,
      };
    },
  };
});

const _nodeOptions = [
  ...converted,
  {
    name: "nodeSize",
    init: () => ({
      variable: defaultNodeSizeVariable as Variable<unknown[], unknown>,
    }),
  },
  {
    name: "socketRadius",
    init: () => ({
      variable: socketRadiusVariable as Variable<unknown[], unknown>,
    }),
  },
  {
    name: "elapsed",
    init: () => {
      const variable = createVariable(atom([]), () => {
        const oscAtom = atom(0);
        oscAtom.onMount = (set) => {
          const id = setInterval(() => set((prev) => prev + 1));
          return () => clearInterval(id);
        };
        return oscAtom;
      });
      return {
        variable,
      };
    },
  },
  {
    name: "button",
    init: () => {
      const buttonAtom = atom(false);
      const variable = createVariable(atom([]), () => buttonAtom);
      return {
        component: RenderButtonNode,
        variable,
        state: buttonAtom,
      };
    },
  },
];
export const nodeOptions: Option[] = _nodeOptions.map((option) => ({
  name: option.name,
  init: () => ({ component: () => null, ...option.init() }),
}));
