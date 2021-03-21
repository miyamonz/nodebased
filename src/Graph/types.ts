import type { Atom, PrimitiveAtom } from "jotai";
import type { Node, NodeJSON } from "../Node";

export type GraphJSON = {
  nodes: NodeJSON[];
};

type Graph = {
  nodes: PrimitiveAtom<Node[]>;
};
export type GraphView = {
  nodes: NodeJSON[];
};
