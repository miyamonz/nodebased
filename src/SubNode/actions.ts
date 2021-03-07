import { atom } from "jotai";
import type { Node } from "../Node";
import { scopeMapAtom } from "../Scope";

import { createComponent } from "./ScopeNode";
import { createVariable } from "../Variable";

import { appendNode, removeNode } from "../actions";
export const createSubNode = atom(null, (get, set, args: Node | Node[]) => {
  const nodes = Array.isArray(args) ? args : [args];

  const name = window.prompt("input subnode name");
  if (name === null) throw new Error("input");
  console.log(name);
  set(removeNode, nodes);
  const scopeMap = get(scopeMapAtom);
  scopeMap.set(name, { name, nodes: atom(nodes) });

  const sum = nodes
    .map((node) => get(node.rect))
    .reduce((acc, rect) => ({ x: acc.x + rect.x, y: acc.y + rect.y }), {
      x: 0,
      y: 0,
    });
  const position = {
    x: sum.x / nodes.length,
    y: sum.y / nodes.length,
  };

  const variable = createVariable([], () => atom(undefined));

  const node = {
    position,
    variable,
    name: "sub node",
    component: createComponent(name),
  };
  //set(appendNode, node);
});
