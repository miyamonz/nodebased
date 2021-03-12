import { useUpdateAtom } from "jotai/utils";
import { atom } from "jotai";
import { createGraphByNode } from "./funcs";
import type { Graph } from "./types";

const rootGraph = createGraphByNode([]);
export const currentGraphAtom = atom<Graph>(rootGraph);

const rootGraphAtom = atom<Graph>((_get) => rootGraph);
const setRootGraphAtom = atom(null, (get, set) => {
  set(currentGraphAtom, get(rootGraphAtom));
});

export function useSetRootGraph() {
  return useUpdateAtom(setRootGraphAtom);
}
