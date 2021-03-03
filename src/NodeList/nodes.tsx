import { atom } from "jotai";
import { SliderNode, RenderElementNode } from "./components";
import { NodeComponent } from "../Node";
import type { CreateNodeProps } from "../actions";

// variables
import { defaultNodeSizeVariable } from "../Node";
import { socketRadiusVariable } from "../Socket";
import { Variable } from "../Variable";

import { createVariableFromFn } from "./funcs";

import elapsed from "./elapsed";
import button from "./button";
import _if from "./if";
import circle from "./circle";
import unpack from "./unpack";

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
  {
    name: "console.log",
    fn: (_) => {
      console.log(_);
    },
  },
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

const optionFromVariable = (name: string, variable: Variable<any, any>) => ({
  name,
  init: () => ({ variable }),
});

const _nodeOptions = [
  ...converted,
  optionFromVariable("nodeSize", defaultNodeSizeVariable),
  optionFromVariable("socketRadius", socketRadiusVariable),
  elapsed,
  button,
  _if,
  circle,
  unpack,
];
export const nodeOptions: Option[] = _nodeOptions.map((option) => ({
  name: option.name,
  init: () => ({ component: () => null, ...option.init() }),
}));
