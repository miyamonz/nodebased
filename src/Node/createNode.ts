import { atom } from "jotai";
import type { Atom } from "jotai";

import type { Node, NodeJSON, NodeComponent } from "./types";

import { createInputSocket, createOutputSocket } from "../Socket";
import type { InputSocketJSON, OutputSocketJSON } from "../Socket";
import type { Stream } from "../Stream";

import { createRect } from "./rect";
import { nodeOptions } from "../NodeList";
import type { Position } from "../Position";
import type { Rect } from "../Rect";

function getSocketsJsonByName(name: string, data?: {}) {
  const option = nodeOptions.find((option) => option.name === name);
  if (option === undefined) throw new Error(`${name} not found`);

  const _inputs =
    typeof option.inputs === "function" ? option.inputs(data) : option.inputs;
  const isockets: InputSocketJSON[] = _inputs.map((t, i) => ({
    type: "input",
    name: t.name ?? i,
  }));
  const _outputs =
    typeof option.outputs === "function"
      ? option.outputs(data)
      : option.outputs;
  const osockets: OutputSocketJSON[] = _outputs.map((t, i) => ({
    type: "output",
    name: t.name ?? i,
  }));

  return { isockets, osockets };
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Props = PartialBy<NodeJSON, "id" | "isockets" | "osockets">;
export function createNodeByName({ name, position, id, data }: Props): Node {
  const option = nodeOptions.find((option) => option.name === name);
  if (option === undefined) throw new Error(`${name} not found`);

  const { isockets, osockets } = getSocketsJsonByName(name, data);

  return createNodeByJson({
    name,
    position,
    id,
    isockets,
    osockets,
    data,
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

  const { component = () => null, stream, toSave, innerSize } = option.init({
    data,
  });

  return createNode({
    name,
    position,
    id,
    isockets,
    osockets,
    component,
    stream,
    toSave,
    innerSize,
  });
}

type createNodeProp = {
  name: string;
  position: Position;
  isockets: InputSocketJSON[];
  osockets: OutputSocketJSON[];
  component: NodeComponent;
  stream: Stream;
  toSave: Atom<unknown> | undefined;
  innerSize: Atom<Rect> | undefined;
  id?: string;
};
export function createNode({
  name,
  position,
  isockets,
  osockets,
  component,
  stream,
  toSave,
  innerSize,
  id,
}: createNodeProp): Node {
  console.log("createNode", name);
  const rect = createRect(position, innerSize);

  const nodeId = id ?? Math.floor(Math.random() * 10 ** 12).toString();

  const _isockets = atom(
    isockets.map((s, i) => {
      const pAtom = atom((get) => {
        const position = get(rect);
        return {
          ...position,
          y: position.y + get(rect).height / 2 + i * 25,
        };
      });
      return createInputSocket(s, pAtom, nodeId);
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
      return createOutputSocket(s, pAtom, nodeId);
    })
  );

  return {
    rect,
    isockets: _isockets,
    osockets: _osockets,
    name,
    component,
    id: nodeId,
    stream,
    toSave,
  };
}
