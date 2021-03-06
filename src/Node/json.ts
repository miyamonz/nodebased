import { Getter } from "jotai/core/types";
import { createNodeAtomFromPosition } from "./funcs";
import type { Node } from "./types";

export type NodeJSON = {
  name: string;
  position: { x: number; y: number };
};

export function nodeToJson(get: Getter, node: Node): NodeJSON {
  const rect = get(node.rect);
  return {
    name: node.name,
    position: {
      x: rect.x,
      y: rect.y,
    },
  };
}

export function jsonToNodeAtom(json: NodeJSON) {
  return createNodeAtomFromPosition(json.name, json.position);
}
