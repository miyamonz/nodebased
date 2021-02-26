import { atom } from "jotai";
import type { Scope } from "./types";
import type { NodeAtom } from "../Node";

const defaultScope: Scope = {
  name: "default",
  nodes: atom<NodeAtom[]>([]),
};
export const scopeMapAtom = atom(
  new Map<string, Scope>([[defaultScope.name, defaultScope]])
);

export const currentScopeNameAtom = atom("default");

export const currentScopeAtom = atom((get) => {
  const name = get(currentScopeNameAtom);
  const scopeMap = get(scopeMapAtom);
  const scope = scopeMap.get(name);
  if (scope === undefined) throw new Error("scope is not found");
  return scope;
});

export const appendScope = atom(null, (get, set, scope: Scope) => {
  set(scopeMapAtom, (prev) => new Map(prev));
});
