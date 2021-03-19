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

const uuid = () => Math.floor(Math.random() * 10 ** 12).toString();

export function replaceNodeIds(
  json: GraphJSON,
  replacer = (_: number) => uuid()
): GraphJSON {
  const idMap = Object.fromEntries(
    json.nodes.map((n, i) => [n.id, replacer(i)])
  );
  const nodes = json.nodes.map((n) => ({ ...n, id: idMap[n.id] }));
  const connections = json.connections.map((c) => {
    const from = { ...c.from, nodeId: idMap[c.from.nodeId] };
    const to = { ...c.to, nodeId: idMap[c.to.nodeId] };
    return { from, to };
  });

  return { nodes, connections };
}

export const jsonToGraph = (get: Getter) => (json: GraphJSON) => {
  const _json = replaceNodeIds(json); // replacing id should be at first
  const nodes = _json.nodes.map(jsonToNode);
  const connections = _json.connections.map(jsonToConnection(get)(nodes));
  return createGraph(nodes, connections);
};
