import type { Getter } from "jotai/core/types";
import type { Edge, EdgeJSON } from "./types";
import type { Node } from "../Node";

export const edgeToJson = (get: Getter) => (nodes: Node[]) => (
  c: Edge<unknown>
): EdgeJSON => {
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
      nodeId: fromNode.id,
      socketName: fromSocket.name,
    },
    to: {
      nodeId: toNode.id,
      socketName: toSocket.name,
    },
  };
};

export const jsonToEdge = (get: Getter) => (nodes: Node[]) => (
  c: EdgeJSON
): Edge<unknown> => {
  const fromNode = nodes.find((n) => n.id === c.from.nodeId);
  const toNode = nodes.find((n) => n.id === c.to.nodeId);
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
