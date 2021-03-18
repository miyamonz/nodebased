import { atom } from "jotai";
import type { Atom } from "jotai";

import type { Node, NodeJSON, NodeComponent } from "./types";
import type { Variable } from "../Variable";

import { createInputSocket, createOutputSocket } from "../Socket";
import type { InputSocketJSON, OutputSocketJSON } from "../Socket";

import { createRectAtom } from "../Rect";
import { defaultNodeSizeVariable } from "./variables";
import { nodeOptions } from "../NodeList";
import type { Position } from "../Position";

const sizeAtom = atom(
  (get) =>
    get(get(defaultNodeSizeVariable.outputAtoms)[0]) as {
      width: number;
      height: number;
    }
);
function createRect(position: Position) {
  const rectPos = atom(position);
  const rect = createRectAtom(rectPos, sizeAtom);
  return rect;
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Props = PartialBy<NodeJSON, "id">;
export function createNodeByName({ name, position, id, data }: Props): Node {
  const option = nodeOptions.find((option) => option.name === name);
  if (option === undefined) throw new Error(`${name} not found`);

  const { variable, component, toSave } = option.init({ data });
  return createNode({ name, position, id, variable, component, toSave });
}

type createNodeProp = {
  name: string;
  position: Position;
  variable: Variable;
  component: NodeComponent;
  toSave: Atom<unknown> | undefined;
  id?: string;
};
export function createNode({
  name,
  position,
  variable,
  component,
  toSave,
  id,
}: createNodeProp) {
  console.log("createNode", name);
  const rect = createRect(position);
  const isockets = createInputSockets(rect, variable.inputAtoms);
  const osockets = createOutputSockets(rect, variable.outputAtoms);

  id = id ?? Math.floor(Math.random() * 10 ** 12).toString();
  return {
    rect,
    isockets,
    osockets,
    name,
    component,
    id,
    toSave,
  };
}
