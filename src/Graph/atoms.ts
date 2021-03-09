import { atom } from "jotai";
import { getConnections } from "../Connect/atoms";
import type { Graph } from "./types";
import type { Node } from "../Node";

function createEmptyGraph(): Graph {
  const nodes = atom<Node[]>([]);
  return {
    nodes,
    connections: atom((get) => get(getConnections(get(nodes)))),
  };
}
export const currentGraph = atom<Graph>(createEmptyGraph());
