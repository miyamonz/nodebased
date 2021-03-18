import type { Getter } from "jotai/core/types";
import type { Connection, ConnectionJSON } from "./types";
import type { Node } from "../Node";

export const connectionToJson = (get: Getter) => (nodes: Node[]) => (
  c: Connection<unknown>
): ConnectionJSON => {
  const isocket = c.to;
  const osocket = c.from;

  const fromNodeIdx = nodes.findIndex((node) =>
    get(node.osockets)
      .map((s) => s.nodeId)
      .includes(osocket.nodeId)
  );
  const toNodeIdx = nodes.findIndex((node) =>
    get(node.isockets)
      .map((s) => s.nodeId)
      .includes(isocket.nodeId)
  );
  if (fromNodeIdx === -1) throw new Error("from node socket not found");
  if (toNodeIdx === -1) throw new Error("to node socket not found");
  const fromNode = nodes[fromNodeIdx];
  const toNode = nodes[toNodeIdx];

  const fromSocket = get(fromNode.osockets).find(
    (output) => output.nodeId === osocket.nodeId && output.name === osocket.name
  );
  const toSocket = get(toNode.isockets).find(
    (input) => input.nodeId === isocket.nodeId && input.name === isocket.name
  );
  if (fromSocket === undefined) throw new Error("from socket not found");
  if (toSocket === undefined) throw new Error("to socket not found");

  return {
    from: {
      nodeIndex: fromNodeIdx,
      socketName: fromSocket.name,
    },
    to: {
      nodeIndex: toNodeIdx,
      socketName: toSocket.name,
    },
  };
};

export const jsonToConnection = (get: Getter) => (nodes: Node[]) => (
  c: ConnectionJSON
): Connection<unknown> => {
  const fromNode = nodes[c.from.nodeIndex];
  const toNode = nodes[c.to.nodeIndex];
  if (fromNode === undefined) {
    throw new Error("fromNode not found");
  }
  if (toNode === undefined) {
    throw new Error("toNode not found");
  }
  const outSocket = get(fromNode.osockets).find(
    (s) => s.name === c.from.socketName
  );
  const inSocket = get(toNode.isockets).find((s) => s.name === c.to.socketName);
  if (outSocket === undefined) {
    throw new Error("out socket not found");
  }
  if (inSocket === undefined) {
    throw new Error("in socket not found");
  }
  return { from: outSocket, to: inSocket };
};
