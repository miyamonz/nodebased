import { atom } from "jotai";
import type { Atom } from "jotai";
import type { Connection } from "./types";
import type { OutputSocket } from "../Socket";
import type { Node } from "../Node";
import { currentNodesAtom } from "../actions";

// output
export const connectTargetAtom = atom<OutputSocket<unknown> | null>(null);

export const connectionAtom = atom<Connection<unknown>[]>((get) => {
  const nodes = get(currentNodesAtom);
  const connections = get(getConnections(nodes));
  return connections;
});

export function getConnections(nodes: Node[]): Atom<Connection<unknown>[]> {
  return atom((get) => {
    const isockets = nodes.map((node) => node.inputs).flatMap((a) => a);
    const osockets = nodes.map((node) => node.outputs).flatMap((a) => a);
    const connections = isockets
      .map((isocket) => {
        const found = osockets.find(
          (osocket) => osocket.atom === get(isocket.ref)
        );
        if (found === undefined) return undefined;
        return {
          from: found,
          to: isocket,
        };
      })
      .filter((a): a is Connection<unknown> => a !== undefined);

    return connections;
  });
}
