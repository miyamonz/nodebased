import { atom } from "jotai";
import type { Atom } from "jotai";
import { getConnections } from "../Connect/atoms";
import type { Graph, GraphView } from "./types";
import type { Node } from "../Node";
import type { Connection } from "../Connect";

export function createGraph(
  nodes: Node[],
  connections: Connection<unknown>[] = []
): Graph {
  const nodesAtom = atom<Node[]>(nodes);
  return {
    nodes: nodesAtom,
    connections: atom(connections),
  };
}

export function getGraphViewByNodes(
  nodesAtom: Atom<Node[]>,
  graph: Graph
): GraphView {
  return {
    nodes: nodesAtom,
    connections: atom((get) => get(getConnections(get(nodesAtom), graph))),
  };
}
