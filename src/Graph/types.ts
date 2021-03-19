import type { Atom, PrimitiveAtom } from "jotai";
import type { Node, NodeJSON } from "../Node";
import type { Edge, EdgeJSON } from "../Edge";

export type GraphJSON = {
  nodes: NodeJSON[];
  edges: EdgeJSON[];
};

export type Graph = {
  nodes: PrimitiveAtom<Node[]>;
  edges: PrimitiveAtom<Edge<unknown>[]>;
};
export type GraphView = {
  nodes: Atom<Node[]>;
  edges: Atom<Edge<unknown>[]>;
};
