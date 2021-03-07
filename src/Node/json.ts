import { Getter } from "jotai/core/types";
import { createNodeFromPosition } from "./funcs";
import type { Node } from "./types";

export type NodeJSON = {
  name: string;
  position: { x: number; y: number };
  id: string;
};

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

export function jsonToNode(json: NodeJSON) {
  return createNodeFromPosition(json.name, json.position);
}
