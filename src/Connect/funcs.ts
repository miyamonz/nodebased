import type { Connection } from "./types";
import type { Node } from "../Node";

export function filterConnection(
  nodes: Node[],
  connections: Connection<unknown>[]
) {
  return connections.filter((c) => {
    return (
      nodes.flatMap((n) => n.outputs).includes(c.from) &&
      nodes.flatMap((n) => n.inputs).includes(c.to)
    );
  });
}
