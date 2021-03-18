import type { NodeDefinition } from "./types";

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

const optionFromVariable = (
  name: string,
  variable: Variable
): NodeDefinition => ({
  name,
  init: () => ({ variable }),
});

export const nodeOptions: Required<NodeDefinition>[] = [
  // ui
  slider as any,
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
  optionFromVariable("nodeSize", defaultNodeSizeVariable),
  optionFromVariable("socketRadius", socketRadiusVariable),
].map((def) => ({
  ...def,
  inputs: def?.inputs ?? [],
  outputs: def?.outputs ?? [],
}));

export const nodeNames: string[] = nodeOptions.map((o) => o.name);
