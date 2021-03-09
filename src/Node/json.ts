import { Getter } from "jotai/core/types";
import type { Node, NodeJSON } from "./types";

export function nodeToJson(get: Getter, node: Node): NodeJSON {
  const rect = get(node.rect);
  return {
    name: node.name,
    id: node.id,
    position: {
      x: rect.x,
      y: rect.y,
    },
  };
}
