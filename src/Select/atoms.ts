import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { nodeToJson } from "../Node";
import type { Node } from "../Node";
import { connectionAtom, filterConnection, Connection } from "../Connect";
import { connectionToJson } from "../Connect/json";
import { copyToClipboard } from "../util";

// selected nodes
export const selectedNodesAtom = atom<Node[]>([]);
export function useSelectedNodes() {
  return useAtomValue(selectedNodesAtom);
}

export function useSetSelected() {
  return useUpdateAtom(selectedNodesAtom);
}

const selectedAtomJSON = atom(
  (get) => {
    const nodes = get(selectedNodesAtom);
    const connections = get(selectedConnectionsAtom);
    return {
      nodes: nodes.map(nodeToJson(get)),
      connections: connections.map(connectionToJson(nodes)),
    };
  },
  (get) => {
    const json = get(selectedAtomJSON);
    copyToClipboard(JSON.stringify(json));
  }
);

export function useCopyToClipboard() {
  const set = useUpdateAtom(selectedAtomJSON);
  return () => set();
}

// connection
export const selectedConnectionsAtom = atom<Connection<unknown>[]>((get) => {
  const selectedNodes = get(selectedNodesAtom);
  const connections = get(connectionAtom);

  return filterConnection(selectedNodes, connections);
});
