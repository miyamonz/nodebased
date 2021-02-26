import { atom } from "jotai";
import { createNodeAtomFromPosition } from "./Node";
import type { NodeAtom } from "./Node";
import { currentScopeAtom, scopeMapAtom } from "./Scope";

import { createComponent } from "./SubNode/ScopeNode";
import { createVariable } from "./Variable";

export const currentNodesAtom = atom((get) => get(get(currentScopeAtom).nodes));

export const appendNodeAtom = atom(
  null,
  (get, set, args: Parameters<typeof createNodeAtomFromPosition>[0]) => {
    const nodeAtom = createNodeAtomFromPosition(args);

    const currentScope = get(currentScopeAtom);
    set(currentScope.nodes, (prev) => [...prev, nodeAtom]);
  }
);

export const removeNodeAtom = atom(
  null,
  (get, set, args: NodeAtom | NodeAtom[]) => {
    const nodeAtoms = Array.isArray(args) ? args : [args];

    const currentScope = get(currentScopeAtom);
    set(currentScope.nodes, (prev) =>
      prev.filter((na) => !nodeAtoms.includes(na))
    );
  }
);
export const createSubNodeAtom = atom(
  null,
  (get, set, args: NodeAtom | NodeAtom[]) => {
    const nodeAtoms = Array.isArray(args) ? args : [args];

    const name = window.prompt("input subnode name");
    if (name === null) throw new Error("input");
    console.log(name);
    set(removeNodeAtom, nodeAtoms);
    const scopeMap = get(scopeMapAtom);
    scopeMap.set(name, { name, nodes: atom(nodeAtoms) });

    const sum = nodeAtoms
      .map(get)
      .map((node) => get(node.rect))
      .reduce((acc, rect) => ({ x: acc.x + rect.x, y: acc.y + rect.y }), {
        x: 0,
        y: 0,
      });
    const position = {
      x: sum.x / nodeAtoms.length,
      y: sum.y / nodeAtoms.length,
    };

    const variable = createVariable([], () => atom(undefined));

    const node = {
      position,
      variable,
      name: "sub node",
      component: createComponent(name),
    };
    set(appendNodeAtom, node);
  }
);
