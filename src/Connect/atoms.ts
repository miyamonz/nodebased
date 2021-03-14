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
    const isockets = nodes.map((node) => get(node.isockets)).flatMap((a) => a);
    const osockets = nodes.map((node) => get(node.osockets)).flatMap((a) => a);

    const conns = get(graph.connections).filter((c) => {
      return (
        osockets.map((s) => s.atom).includes(c.from.atom) &&
        isockets.map((s) => s.ref).includes(c.to.ref)
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
    conns.forEach((c) => set(c.to.ref, c.from.atom));
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
    conns.forEach((c) => set(c.to.ref, atom(null)));
  }
);
export function useDisconnect() {
  return useUpdateAtom(setDisconnectAtom);
}
