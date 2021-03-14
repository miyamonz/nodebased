import type { Getter } from "jotai/core/types";
import type { Connection, ConnectionJSON } from "./types";
import type { Node } from "../Node";

export const connectionToJson = (get: Getter) => (nodes: Node[]) => (
  c: Connection<unknown>
): ConnectionJSON => {
  const isocket = c.to;
  const osocket = c.from;

  const fromNode = nodes.find((node) => get(node.osockets).includes(osocket));
  const toNode = nodes.find((node) => get(node.isockets).includes(isocket));

  if (fromNode === undefined || toNode === undefined)
    throw new Error("socket not found");

  const fromIdx = get(fromNode.osockets).findIndex(
    (output) => output === osocket
  );
  const toIdx = get(toNode.isockets).findIndex((input) => input === isocket);
  if (fromIdx === -1) throw new Error("not found");
  if (toIdx === -1) throw new Error("not found");

  return {
    from: {
      node: fromNode.id,
      socket: fromIdx,
    },
    to: {
      node: toNode.id,
      socket: toIdx,
    },
  };
};

export const jsonToConnection = (get: Getter) => (nodes: Node[]) => (
  c: ConnectionJSON
) => {
  const fromNode = nodes.find((n) => n.id === c.from.node);
  const toNode = nodes.find((n) => n.id === c.to.node);
  if (fromNode === undefined || toNode === undefined) {
    throw new Error("node not found");
  }
  const outSocket = get(fromNode.osockets)[c.from.socket];
  const inSocket = get(toNode.isockets)[c.to.socket];
  return { from: outSocket, to: inSocket };
};
