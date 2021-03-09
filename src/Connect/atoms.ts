import { atom } from "jotai";
import type { Atom } from "jotai";
import type { Connection } from "./types";
import type { OutputSocket } from "../Socket";
import type { Scope } from "../Scope/types";
import { currentScopeAtom } from "../Scope";
import type { Node } from "../Node";

// output
export const connectTargetAtom = atom<OutputSocket<unknown> | null>(null);

export const connectionAtom = atom<Connection<unknown>[]>((get) => {
  const scope = get(currentScopeAtom);
  const connections = get(getConnections(scope));
  return connections;
});

function getConnections(scope: Scope): Atom<Connection<unknown>[]> {
  return atom((get) => {
    const nodes = get(scope.nodes);

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
