import { createGraph } from "./funcs";

import { nodeToJson, jsonToNode } from "../Node";
import { connectionToJson, jsonToConnection } from "../Connect";
import type { Getter } from "jotai/core/types";
import type { GraphView, GraphJSON } from "./types";
import type { ConnectionJSON } from "../Connect";

export const graphToJson = (get: Getter) => (graph: GraphView): GraphJSON => {
  const { nodes, connections } = graph;
  const cToJson = connectionToJson(get(nodes));
  return {
    nodes: get(nodes).map(nodeToJson(get)),
    connections: get(connections)
      .map((c) => {
        try {
          return cToJson(c);
        } catch (e: unknown) {
          console.error(e);
          return;
        }
      })
      .filter((a): a is ConnectionJSON => a !== undefined),
  };
};

export function createNodesandConnections(json: GraphJSON) {
  const nodes = json.nodes.map(jsonToNode);
  const connections = json.connections.map(jsonToConnection(nodes));
  const _nodes = nodes.map((n) => ({
    ...n,
    id: Math.floor(Math.random() * 10 ** 12).toString(),
  }));
  return { nodes: _nodes, connections };
}

export function jsonToGraph(json: GraphJSON) {
  const { nodes, connections } = createNodesandConnections(json);
  return createGraph(nodes, connections);
}
