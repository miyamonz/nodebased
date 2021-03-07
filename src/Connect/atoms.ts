import { atom } from "jotai";
import type { Atom } from "jotai";
import type { Connection } from "./types";
import type { OutputSocket } from "../Socket";
import type { Scope } from "../Scope/types";
import { currentScopeAtom } from "../Scope";

// output
export const connectTargetAtom = atom<OutputSocket<unknown> | null>(null);

export const connectionAtom = atom<Connection<unknown>[]>((get) => {
  const scope = get(currentScopeAtom);
  const connections = get(getConnections(scope));
  return connections;
});

function getConnections(scope: Scope): Atom<Connection<unknown>[]> {
  return atom((get) => {
    const nodeAtoms = get(scope.nodes);
    const nodes = nodeAtoms.map(get);

    const connections = nodes.flatMap((node, inNodeIdx) => {
      return node.inputs.flatMap((isocket, isocketIdx) => {
        const found = nodes
          .map((node, outNodeIdx) => {
            const idx = node.outputs.findIndex(
              (osocket) => osocket.atom === get(isocket.ref)
            );
            if (idx === -1) return undefined;
            return [outNodeIdx, idx, node.outputs[idx]];
          })
          .filter(
            (a): a is [number, number, OutputSocket<unknown>] => a !== undefined
          )
          .map(([outNodeId, osocketIdx, osocket]) => {
            return {
              from_: [outNodeId, osocketIdx] as const,
              to_: [inNodeIdx, isocketIdx] as const,
              from: osocket,
              to: isocket,
            };
          });
        return found;
      });
    });
    /*
    const isockets = nodes.map((node) => node.inputs).flatMap((a) => a);
    const osockets = nodes.map((node) => node.outputs).flatMap((a) => a);
    const connections = isockets
      .map((isocket) => {
        const found = osockets.find(
          (osocket) => osocket.atom === get(isocket.ref)
        );
        if (found === undefined) return undefined;
        return {
          from_: [found, 0],
          to_: [0, 0],
          from: found,
          to: isocket,
        };
      })
      .filter((a): a is Connection<unknown> => a !== undefined);
     * */

    return connections;
  });
}
