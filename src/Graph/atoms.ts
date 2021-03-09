import { atom } from "jotai";
import { createGraph } from "./funcs";
import type { Graph } from "./types";

export const currentGraph = atom<Graph>(createGraph([]));
