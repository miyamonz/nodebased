import { atom, useAtom } from "jotai";
import type { Atom } from "jotai";
import type { Connection } from "./types";
import type { OutputSocket } from "../Socket";
import type { Scope } from "../Scope/types";
import { currentScopeAtom } from "../Scope";

// output
export const connectTargetAtom = atom<OutputSocket<unknown> | null>(null);
export function useConnectTarget() {
  const [connectTarget] = useAtom(connectTargetAtom);
  return connectTarget;
}
export function useSetConnectFrom() {
  const [, setConnectTarget] = useAtom(connectTargetAtom);
  return setConnectTarget;
}

export const connectionAtom = atom<Connection<unknown>[]>((get) => {
  const scope = get(currentScopeAtom);
  const connections = get(getConnections(scope));
  return connections;
});

function getConnections(scope: Scope): Atom<Connection<unknown>[]> {
  return atom((get) => {
    const nodeAtoms = get(scope.nodes);
    const nodes = nodeAtoms.map(get);
    const isockets = nodes
      .map((node) => node.inputs)
      .map(get)
      .flatMap((a) => a);
    const connections = isockets
      .map((isocket) => {
        const found = nodes.find(
          (node) => node.output.atom === get(isocket.ref)
        );
        if (found === undefined) return undefined;
        return { from: found.output, to: isocket };
      })
      .filter((a): a is Connection<unknown> => a !== undefined);

    return connections;
  });
}
