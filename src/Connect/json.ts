import { atom } from "jotai";
import type { Getter } from "jotai/core/types";
import type { Connection, ConnectionJSON } from "./types";
import type { Node } from "../Node";
import { useUpdateAtom } from "jotai/utils";
import type { InputSocket, OutputSocket } from "../Socket";

export const connectionToJson = (get: Getter, nodes: Node[]) => (
  c: Connection<unknown>
): ConnectionJSON => {
  const isocket = c.to;
  const osocket = c.from;

  const fromNode = nodes.find((node) => node.outputs.includes(osocket));
  const toNode = nodes.find((node) => node.inputs.includes(isocket));

  if (fromNode === undefined || toNode === undefined)
    throw new Error("socket not found");

  const fromIdx = fromNode.outputs.findIndex(
    (osocket) => osocket.atom === get(isocket.ref)
  );
  const toIdx = toNode.inputs.findIndex(
    (osocket) => osocket.atom === get(isocket.ref)
  );
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

const connectSocketAtom = atom(
  null,
  (
    _get,
    set,
    [from, to]: readonly [OutputSocket<unknown>, InputSocket<unknown>]
  ) => {
    set(to.ref, from.atom);
  }
);
export function useConnectSocket() {
  return useUpdateAtom(connectSocketAtom);
}

export const getSocketByJson = (nodes: Node[]) => (c: ConnectionJSON) => {
  const fromNode = nodes.find((n) => n.id === c.from.node);
  const toNode = nodes.find((n) => n.id === c.to.node);
  if (fromNode === undefined || toNode === undefined) {
    throw new Error("node not found");
  }
  const outSocket = fromNode.outputs[c.from.socket];
  const inSocket = toNode.inputs[c.to.socket];
  return [outSocket, inSocket] as const;
};
