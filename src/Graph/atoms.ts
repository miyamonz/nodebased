import { atom } from "jotai";
import { getConnections } from "../Connect/atoms";
import type { Graph } from "./types";

function createEmptyGraph(): Graph {
  const nodes: Graph["nodes"] = atom([]);
  return {
    nodes,
    connections: atom((get) => get(getConnections(get(nodes)))),
  };
}
export const currentGraph = atom<Graph>(createEmptyGraph());
