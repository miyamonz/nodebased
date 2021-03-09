import { nodeToJson } from "../Node";
import { connectionToJson } from "../Connect/json";
import type { Getter } from "jotai/core/types";
import type { Graph, GraphJSON } from "./types";

export const graphToJson = (get: Getter) => (graph: Graph): GraphJSON => {
  const { nodes, connections } = graph;
  return {
    nodes: get(nodes).map(nodeToJson(get)),
    connections: get(connections).map(connectionToJson(get(nodes))),
  };
};
