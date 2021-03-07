import { atom } from "jotai";
import type { Setter } from "jotai/core/types";
import type { Connection } from "./types";
import type { Node } from "../Node";
import { useUpdateAtom } from "jotai/utils";
import type { InputSocket, OutputSocket } from "../Socket";

export type ConnectionJSON = {
  from: {
    node: string;
    socket: number;
  };
  to: {
    node: string;
    socket: number;
  };
};
export function connectionToJson(c: Connection<unknown>): ConnectionJSON {
  return {
    from: {
      node: c.from_[0],
      socket: c.from_[1],
    },
    to: {
      node: c.to_[0],
      socket: c.to_[1],
    },
  };
}

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
export const connectByJson = (nodes: Node[]) => (c: ConnectionJSON) => {
  const fromNode = nodes.find((n) => n.id === c.from.node);
  const toNode = nodes.find((n) => n.id === c.to.node);
  if (fromNode === undefined || toNode === undefined) {
    throw new Error("node not found");
  }
  const outSocket = fromNode.outputs[c.from.socket];
  const inSocket = toNode.inputs[c.to.socket];
  return [outSocket, inSocket] as const;
};
