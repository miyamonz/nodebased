import { atom } from "jotai";
import { nodeAtomListAtom } from "./Node";

export const currentNodesAtom = atom((get) => get(nodeAtomListAtom));
