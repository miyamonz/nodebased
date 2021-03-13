import type { CreateNodeProps } from "./types";

// variables
import { defaultNodeSizeVariable } from "../Node/variables"; //bug
import { socketRadiusVariable } from "../Socket";
import type { Variable } from "../Variable";

import { fnNodes } from "./funcs";

import slider from "./slider";
import render from "./render";
import elapsed from "./elapsed";
import button from "./button";
import _if from "./if";
import hold from "./hold";
import circle from "./circle";
import rect from "./rect";
import line from "./line";
import unpack from "./unpack";
import onMouse from "./onMouse";
import press from "./press";
import mouse from "./mouse";
import asFn from "./asFn";
import jsonNode from "./jsonNode";
import { option as graph } from "../GraphNode";
import { option as instantiate } from "../InstantiateNode";

type Option = {
  name: string;
  init: (arg?: { data?: {} }) => Omit<CreateNodeProps, "position" | "name">;
};

const optionFromVariable = (name: string, variable: Variable) => ({
  name,
  init: () => ({ variable }),
});

const _nodeOptions = [
  slider,
  ...fnNodes,
  optionFromVariable("nodeSize", defaultNodeSizeVariable as any),
  optionFromVariable("socketRadius", socketRadiusVariable as any),
  elapsed,
  button,
  _if,
  hold,
  render,
  circle,
  rect,
  line,
  onMouse,
  press,
  unpack,
  mouse,
  asFn,
  jsonNode,
  graph,
  instantiate,
];
export const nodeOptions: Option[] = _nodeOptions.map((option) => ({
  name: option.name,
  init: (...args: any[]) => ({
    component: () => null,
    ...option.init(...args),
  }),
})) as any;
export const nodeNames: string[] = nodeOptions.map((o) => o.name);
