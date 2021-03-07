import { atom, useAtom } from "jotai";
import { nodeToJson } from "../Node";
import type { Node } from "../Node";
import type { Rect } from "../Rect";
import { connectionAtom, filterConnection, Connection } from "../Connect";
import { connectionToJson } from "../Connect/json";
import { copyToClipboard } from "../util";

//drag rect
export const selectRectAtom = atom<Rect | null>(null);
export function useSelectRectAtom() {
  const [rect] = useAtom(selectRectAtom);
  return rect;
}

// selected nodes
export const selectedNodesAtom = atom<Node[]>([]);
export function useSelectedNodes() {
  const [nodes] = useAtom(selectedNodesAtom);
  return nodes;
}

export function useSetSelected() {
  return useAtom(selectedNodesAtom)[1];
}

const selectedAtomJSON = atom(
  (get) => {
    const nodes = get(selectedNodesAtom);
    const connections = get(selectedConnectionsAtom);
    return {
      nodes: nodes.map((node) => {
        return nodeToJson(get, node);
      }),
      connections: connections.map(connectionToJson),
    };
  },
  (get) => {
    const json = get(selectedAtomJSON);
    copyToClipboard(JSON.stringify(json));
  }
);

export function useCopyToClipboard() {
  const [, set] = useAtom(selectedAtomJSON);
  return () => set();
}

// connection
export const selectedConnectionsAtom = atom<Connection<unknown>[]>((get) => {
  const selectedNodes = get(selectedNodesAtom);
  const connections = get(connectionAtom);

  return filterConnection(selectedNodes, connections);
});
