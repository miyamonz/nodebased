import type { Getter } from "jotai/core/types";
import type { Node, NodeJSON } from "./types";

export const nodeToJson = (get: Getter) => (node: Node): NodeJSON => {
  const rect = get(node.rect);
  return {
    name: node.name,
    id: node.id,
    position: {
      x: rect.x,
      y: rect.y,
    },
    data: node.saveData ? (get(node.outputs[0].atom) as JSON) : undefined,
  };
};
