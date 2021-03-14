import type { Getter } from "jotai/core/types";
import type { Node, NodeJSON } from "./types";
import { createNodeByName } from "./createNode";

export const nodeToJson = (get: Getter) => (node: Node): NodeJSON => {
  const rect = get(node.rect);
  return {
    name: node.name,
    id: node.id,
    position: {
      x: rect.x,
      y: rect.y,
    },
    data: node.saveData ? (get(get(node.osockets)[0].atom) as JSON) : undefined,
  };
};

export const jsonToNode = createNodeByName;
