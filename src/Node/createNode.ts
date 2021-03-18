import { atom } from "jotai";
import type { Atom } from "jotai";

import type { Node, NodeJSON, NodeComponent } from "./types";

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
type Props = PartialBy<NodeJSON, "id" | "isockets" | "osockets">;
export function createNodeByName({ name, position, id, data }: Props): Node {
  const option = nodeOptions.find((option) => option.name === name);
  if (option === undefined) throw new Error(`${name} not found`);

  const { component = () => null, toSave } = option.init({ data });

  const isockets: InputSocketJSON[] = option.inputs.map((t, i) => ({
    type: "input",
    name: t.name ?? i,
  }));
  const osockets: OutputSocketJSON[] = option.inputs.map((t, i) => ({
    type: "output",
    name: t.name ?? i,
  }));
  return createNode({
    name,
    position,
    isockets,
    osockets,
    id,
    component,
    toSave,
  });
}

type JSONProps = PartialBy<NodeJSON, "id">;
export function createNodeByJson({
  name,
  position,
  id,
  isockets,
  osockets,
  data,
}: JSONProps): Node {
  const option = nodeOptions.find((option) => option.name === name);
  if (option === undefined) throw new Error(`${name} not found`);

  const { component = () => null, toSave } = option.init({ data });
  return createNode({
    name,
    position,
    id,
    isockets,
    osockets,
    component,
    toSave,
  });
}

type createNodeProp = {
  name: string;
  position: Position;
  isockets: InputSocketJSON[];
  osockets: OutputSocketJSON[];
  component: NodeComponent;
  toSave: Atom<unknown> | undefined;
  id?: string;
};
export function createNode({
  name,
  position,
  isockets,
  osockets,
  component,
  toSave,
  id,
}: createNodeProp): Node {
  console.log("createNode", name);
  const rect = createRect(position);

  const _isockets = atom((get) =>
    isockets.map((s, i) => {
      const p = { ...position, y: position.y + get(rect).height / 2 + i * 25 };
      return createInputSocket(s, atom(p));
    })
  );
  const _osockets = atom((get) =>
    osockets.map((s, i) => {
      const p = {
        ...position,
        y: position.y + get(rect).height / 2 + i * 25,
        x: position.x + get(rect).width,
      };
      return createOutputSocket(s, atom(p));
    })
  );

  id = id ?? Math.floor(Math.random() * 10 ** 12).toString();
  return {
    rect,
    isockets: _isockets,
    osockets: _osockets,
    name,
    component,
    id,
    toSave,
  };
}
