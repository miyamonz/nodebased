import { atom } from "jotai";
import type { Atom } from "jotai";
import { getEdges } from "../Edge/atoms";
import type { Graph, GraphView } from "./types";
import type { Node } from "../Node";
import type { Edge } from "../Edge";

export function createGraph(
  nodes: Node[],
  edges: Edge<unknown>[] = []
): Graph {
  const nodesAtom = atom<Node[]>(nodes);
  return {
    nodes: nodesAtom,
    edges: atom(edges),
  };
}

export function getGraphViewByNodes(
  nodesAtom: Atom<Node[]>,
  graph: Graph
): GraphView {
  return {
    nodes: nodesAtom,
    edges: atom((get) => get(getEdges(get(nodesAtom), graph))),
  };
}
