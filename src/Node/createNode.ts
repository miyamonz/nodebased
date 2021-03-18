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
  const osockets: OutputSocketJSON[] = option.outputs.map((t, i) => ({
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

  const id_ = id ?? Math.floor(Math.random() * 10 ** 12).toString();

  const _isockets = atom(
    isockets.map((s, i) => {
      const pAtom = atom((get) => {
        const position = get(rect);
        return {
          ...position,
          y: position.y + get(rect).height / 2 + i * 25,
        };
      });
      return createInputSocket(s, id_, pAtom);
    })
  );
  const _osockets = atom(() =>
    osockets.map((s, i) => {
      const pAtom = atom((get) => {
        const position = get(rect);
        return {
          ...position,
          x: position.x + get(rect).width,
          y: position.y + get(rect).height / 2 + i * 25,
        };
      });
      return createOutputSocket(s, id_, pAtom);
    })
  );

  return {
    rect,
    isockets: _isockets,
    osockets: _osockets,
    name,
    component,
    id: id_,
    toSave,
  };
}
