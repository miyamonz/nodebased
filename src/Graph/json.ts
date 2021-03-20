import { createGraph } from "./funcs";

import { nodeToJson, jsonToNode } from "../Node";
import type { Getter } from "jotai/core/types";
import type { GraphView, GraphJSON } from "./types";

export const graphToJson = (get: Getter) => (graph: GraphView): GraphJSON => {
  const { nodes } = graph;
  return {
    nodes: get(nodes).map(nodeToJson(get)),
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

  return { nodes };
}

export const jsonToGraph = (_get: Getter) => (json: GraphJSON) => {
  const _json = replaceNodeIds(json); // replacing id should be at first
  const nodes = _json.nodes.map(jsonToNode);
  return createGraph(nodes);
};
