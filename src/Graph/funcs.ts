import { atom } from "jotai";
import type { Atom } from "jotai";
//import { getEdges } from "../Edge/atoms";
import type { Graph, GraphView } from "./types";
import type { Node } from "../Node";

export function createGraph(nodes: Node[]): Graph {
  const nodesAtom = atom<Node[]>(nodes);
  return {
    nodes: nodesAtom,
  };
}

export function getGraphViewByNodes(
  nodesAtom: Atom<Node[]>,
  graph: Graph
): GraphView {
  return {
    nodes: nodesAtom,
    // TODO something need like get edges
    //edges: atom((get) => get(getEdges(get(nodesAtom), graph))),
  };
}
