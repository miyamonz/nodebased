import type { GraphJSON } from "./types";
import type { NodeJSON } from "../Node";

export function createGraph(nodes: NodeJSON[]): GraphJSON {
  return {
    nodes,
  };
}
