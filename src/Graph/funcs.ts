import { atom } from "jotai";
import type { Atom } from "jotai";
import { getConnections } from "../Connect/atoms";
import type { Graph, GraphView } from "./types";
import type { Node } from "../Node";

export function createGraphByNode(nodes: Node[]): Graph {
  const nodesAtom = atom<Node[]>(nodes);
  return {
    nodes: nodesAtom,
    connections: atom((get) => get(getConnections(nodes))),
  };
}

export function getGraphViewByNodes(nodesAtom: Atom<Node[]>): GraphView {
  return {
    nodes: nodesAtom,
    connections: atom((get) => get(getConnections(get(nodesAtom)))),
  };
}
