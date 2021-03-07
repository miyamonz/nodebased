import { atom } from "jotai";
import { createNode } from "./createNode";

import { createRectAtom } from "../Rect";
import { defaultNodeSizeVariable } from "./variables";
import { nodeOptions } from "../NodeList";
import type { Position } from "../Position";

function createRect(position: Position) {
  const rectPos = atom(position);
  const outputAtom = defaultNodeSizeVariable.outputAtoms[0];
  const rect = createRectAtom(rectPos, outputAtom);
  return rect;
}

export function createNodeFromPosition(name: string, position: Position) {
  const option = nodeOptions.find((option) => option.name === name);
  if (option === undefined) throw new Error(`${name} not found`);
  const args = option.init();
  const rect = createRect(position);

  const node = createNode({
    name,
    rect,
    ...args,
  });
  return node;
}
