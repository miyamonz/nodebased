import { useCallback } from "react";
import { createGraph } from "./funcs";

import { nodeToJson, createNode } from "../Node";
import { connectionToJson, useSetConnectionJson } from "../Connect";
import type { Getter } from "jotai/core/types";
import type { Graph, GraphJSON } from "./types";

export const graphToJson = (get: Getter) => (graph: Graph): GraphJSON => {
  const { nodes, connections } = graph;
  return {
    nodes: get(nodes).map(nodeToJson(get)),
    connections: get(connections).map(connectionToJson(get(nodes))),
  };
};

export function useCreateGraph() {
  const setConnect = useSetConnectionJson();
  const callback = useCallback((graphJson: GraphJSON) => {
    const nodes = graphJson.nodes.map(createNode);
    graphJson.connections.forEach((c) => setConnect({ nodes, c }));
    const _nodes = nodes.map((n) => ({
      ...n,
      id: Math.floor(Math.random() * 10 ** 12).toString(),
    }));
    return { graph: createGraph(_nodes), nodes: _nodes };
  }, []);
  return callback;
}
