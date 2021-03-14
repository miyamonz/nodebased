import { useCallback } from "react";
import { createGraph } from "./funcs";

import { nodeToJson, jsonToNode } from "../Node";
import { connectionToJson, jsonToConnection } from "../Connect";
import type { Getter } from "jotai/core/types";
import type { GraphView, GraphJSON } from "./types";

export const graphToJson = (get: Getter) => (graph: GraphView): GraphJSON => {
  const { nodes, connections } = graph;
  return {
    nodes: get(nodes).map(nodeToJson(get)),
    connections: get(connections).map(connectionToJson(get(nodes))),
  };
};

export function jsonToGraph(json: GraphJSON) {
  const nodes = json.nodes.map(jsonToNode);
  const connections = json.connections.map(jsonToConnection(nodes));
  const _nodes = nodes.map((n) => ({
    ...n,
    id: Math.floor(Math.random() * 10 ** 12).toString(),
  }));
  return createGraph(_nodes, connections);
}

