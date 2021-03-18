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
import g from "./g";
import pack from "./pack";
import unpack from "./unpack";
import onMouse from "./onMouse";
import press from "./press";
import select from "./select";
import mouse from "./mouse";
import inlet from "./inlet";
import outlet from "./outlet";
import { option as graph } from "../GraphNode";
import { option as instantiate } from "../InstantiateNode";
import { option as subGraph } from "../SubGraphNode";

type Option = {
  name: string;
  init: (arg?: { data?: {} }) => Omit<CreateNodeProps, "position" | "name">;
};

const optionFromVariable = (name: string, variable: Variable) => ({
  name,
  init: () => ({ variable }),
});

const _nodeOptions = [
  // ui
  slider,
  button,

  // function
  ...fnNodes,

  // time
  elapsed,

  // control flow
  _if,
  hold,
  // svg
  render,
  circle,
  rect,
  line,
  g,
  //svg envent
  onMouse,
  press,
  select,
  //position
  pack,
  unpack,
  mouse,
  // graph
  graph,
  instantiate,
  subGraph,
  inlet,
  outlet,

  // meta variable
  optionFromVariable("nodeSize", defaultNodeSizeVariable as any),
  optionFromVariable("socketRadius", socketRadiusVariable as any),
];
export const nodeOptions: Option[] = _nodeOptions.map((option) => ({
  name: option.name,
  init: (...args: any[]) => ({
    component: () => null,
    ...option.init(...args),
  }),
})) as any;
export const nodeNames: string[] = nodeOptions.map((o) => o.name);
