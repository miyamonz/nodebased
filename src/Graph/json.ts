import { createGraph } from "./funcs";

import { nodeToJson, jsonToNode } from "../Node";
import { connectionToJson, jsonToConnection } from "../Connect";
import type { Getter } from "jotai/core/types";
import type { GraphView, GraphJSON } from "./types";
import type { ConnectionJSON } from "../Connect";

export const graphToJson = (get: Getter) => (graph: GraphView): GraphJSON => {
  const { nodes, connections } = graph;
  const cToJson = connectionToJson(get)(get(nodes));
  return {
    nodes: get(nodes).map(nodeToJson(get)),
    connections: get(connections)
      .map((c) => {
        try {
          return cToJson(c);
        } catch (e: unknown) {
          console.error(e, c);
          return undefined;
        }
      })
      .filter((a): a is ConnectionJSON => a !== undefined),
  };
};

export const jsonToGraph = (get: Getter) => (json: GraphJSON) => {
  const nodes = json.nodes.map(jsonToNode);
  const connections = json.connections.map(jsonToConnection(get)(nodes));
  const _nodes = nodes.map((n) => ({
    ...n,
    id: Math.floor(Math.random() * 10 ** 12).toString(),
  }));
  return createGraph(_nodes, connections);
};
