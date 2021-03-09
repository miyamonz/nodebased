import { atom } from "jotai";
import { getConnections } from "../Connect/atoms";
import type { Graph } from "./types";
import type { Node } from "../Node";

export function createGraph(nodes: Node[]): Graph {
  const nodesAtom = atom<Node[]>(nodes);
  return {
    nodes: nodesAtom,
    connections: atom((get) => get(getConnections(nodes))),
  };
}
