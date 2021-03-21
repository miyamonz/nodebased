import type { Atom } from "jotai";
import type { Node, NodeJSON } from "../Node";

export type GraphJSON = {
  nodes: NodeJSON[];
};

type Graph = {
  nodes: Node[];
};
export type GraphView = {
  nodes: NodeJSON[];
};
