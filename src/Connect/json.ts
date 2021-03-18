import type { Getter } from "jotai/core/types";
import type { Connection, ConnectionJSON } from "./types";
import type { Node } from "../Node";

export const connectionToJson = (get: Getter) => (nodes: Node[]) => (
  c: Connection<unknown>
): ConnectionJSON => {
  const isocket = c.to;
  const osocket = c.from;

  const fromNode = nodes.find((node) =>
    get(node.osockets)
      .map((s) => s.nodeId)
      .includes(osocket.nodeId)
  );
  const toNode = nodes.find((node) =>
    get(node.isockets)
      .map((s) => s.nodeId)
      .includes(isocket.nodeId)
  );

  if (fromNode === undefined) throw new Error("from node socket not found");
  if (toNode === undefined) throw new Error("to node socket not found");

  const fromIdx = get(fromNode.osockets).findIndex(
    (output) => output.nodeId === osocket.nodeId
  );
  const toIdx = get(toNode.isockets).findIndex(
    (input) => input.nodeId === isocket.nodeId
  );
  if (fromIdx === -1) throw new Error("from index not found");
  if (toIdx === -1) throw new Error("to index not found");

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
  if (fromNode === undefined) {
    throw new Error("fromNode not found");
  }
  if (toNode === undefined) {
    throw new Error("toNode not found");
  }
  const outSocket = get(fromNode.osockets)[c.from.socket];
  const inSocket = get(toNode.isockets)[c.to.socket];
  return { from: outSocket, to: inSocket };
};
