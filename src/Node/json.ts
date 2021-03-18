import type { Getter } from "jotai/core/types";
import type { Node, NodeJSON } from "./types";
import { createNodeByName } from "./createNode";
import { socketsToJson } from "../Socket/json";

export const nodeToJson = (get: Getter) => (node: Node): NodeJSON => {
  const rect = get(node.rect);
  return {
    name: node.name,
    id: node.id,
    position: {
      x: rect.x,
      y: rect.y,
    },
    isockets: socketsToJson(get(node.isockets)),
    osockets: socketsToJson(get(node.osockets)),
    data: node.toSave !== undefined ? (get(node.toSave) as {}) : undefined,
  };
};

export const jsonToNode = (json: NodeJSON): Node => {
  // TODO check whether this json satisfies node definiton
  return createNodeByName(json);
};
