import { atom } from "jotai";
import type { NodeAtom } from "../Node";
import { scopeMapAtom } from "../Scope";

import { createComponent } from "./ScopeNode";
import { createVariable } from "../Variable";

import { appendNodeAtom, removeNodeAtom } from "../actions";
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
