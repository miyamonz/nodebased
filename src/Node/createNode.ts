import type { Node, NodeJSON } from "./types";

import { createInputSockets, createOutputSockets } from "../Socket";

import { atom } from "jotai";

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

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Props = PartialBy<NodeJSON, "id">;
export function createNodeByName({ name, position, id, data }: Props): Node {
  const option = nodeOptions.find((option) => option.name === name);
  if (option === undefined) throw new Error(`${name} not found`);

  const { variable, component, saveData } = option.init({ data });
  return createNode({ name, position, id, variable, component, saveData });
}

type createNodeProp = {
  name: string;
  position: Position;
  variable: Variable;
  component: NodeComponent;
  saveData: boolean;
  id?: string;
};
export function createNode({
  name,
  position,
  variable,
  component,
  saveData,
  id,
}: createNodeProp) {
  const rect = createRect(position);
  const inputSockets = createInputSockets(rect, variable.inputAtoms);
  const outputSockets = createOutputSockets(rect, variable.outputAtoms);

  id = id ?? Math.floor(Math.random() * 10 ** 12).toString();
  return {
    rect,
    inputs: inputSockets,
    outputs: outputSockets,
    name,
    component,
    id,
    saveData,
  };
}
