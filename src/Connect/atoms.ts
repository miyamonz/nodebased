import { atom } from "jotai";
import type { Atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { Connection } from "./types";
import type { OutputSocket } from "../Socket";
import type { Node } from "../Node";
import type { Graph } from "../Graph";

// output
export const connectTargetAtom = atom<OutputSocket<unknown> | null>(null);

export function getConnections(
  nodes: Node[],
  graph: Graph
): Atom<Connection<unknown>[]> {
  return atom((get) => {
    const isockets = nodes.flatMap((node) => get(node.isockets));
    const osockets = nodes.flatMap((node) => get(node.osockets));

    const ids = nodes.map((n) => n.id);
    const conns = get(graph.connections).filter((c) => {
      return (
        ids.includes(c.from.nodeId) &&
        ids.includes(c.to.nodeId) &&
        osockets.map((s) => s.name).includes(c.from.name) &&
        isockets.map((s) => s.name).includes(c.to.name)
      );
    });
    return conns;
  });
}

const setConnectAtom = atom(
  null,
  (_get, set, c: Connection<unknown> | Connection<unknown>[]) => {
    console.log("connect");
    const conns = Array.isArray(c) ? c : [c];
    //conns.forEach((c) => set(c.to.ref, c.from.atom));
  }
);
export function useConnect() {
  return useUpdateAtom(setConnectAtom);
}

const setDisconnectAtom = atom(
  null,
  (_get, set, c: Connection<unknown> | Connection<unknown>[]) => {
    console.log("disconnect");
    const conns = Array.isArray(c) ? c : [c];
    //conns.forEach((c) => set(c.to.ref, atom(null)));
  }
);
export function useDisconnect() {
  return useUpdateAtom(setDisconnectAtom);
}
