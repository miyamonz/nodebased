import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { createGraph } from "./funcs";
import type { Graph } from "./types";

export const currentKeyAtom = atom("");
export const currentGraph = atom<Graph>((get) =>
  get(graphAtomFamily(get(currentKeyAtom)))
);

export const graphAtomFamily = atomFamily((_name) => createGraph([]));
