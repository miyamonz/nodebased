import type { NodeDefinition } from "./types";

// streams
import { defaultNodeSizeStream } from "../Node/streams"; //bug
import { socketRadiusStream } from "../Socket";
import type { Stream } from "../Stream";

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
import expose from "./expose";
import { option as graph } from "../GraphNode";
import { option as subGraph } from "../SubGraphNode";

const optionFromStream = (name: string, stream: Stream): NodeDefinition => ({
  name,
  init: () => ({ stream }),
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
  subGraph,
  inlet,
  outlet,
  expose,
  optionFromStream("nodeSize", defaultNodeSizeStream),
  optionFromStream("socketRadius", socketRadiusStream),
].map((def) => ({
  ...def,
  inputs: def?.inputs ?? [],
  outputs: def?.outputs ?? [],
}));

export const nodeNames: string[] = nodeOptions.map((o) => o.name);
