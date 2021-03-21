import { atom } from "jotai";
import type { Atom } from "jotai";

import type { NodeJSON, NodeComponent } from "./types";

import { createInputSocket, createOutputSocket } from "../Socket";
import type { InputSocketJSON, OutputSocketJSON } from "../Socket";
import type { Stream } from "../Stream";

import { createRectAtom } from "../Rect";
import { defaultNodeSizeStream } from "./streams";
import { nodeOptions } from "../NodeList";
import type { Position } from "../Position";

const sizeAtom = atom(
  (get) =>
    get(get(defaultNodeSizeStream.outputAtoms)[0]) as {
      width: number;
      height: number;
    }
);
function createRect(position: Position) {
  const rectPos = atom(position);
  const rect = createRectAtom(rectPos, sizeAtom);
  return rect;
}

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
export function createNodeByName({
  name,
  position,
  id,
  data,
}: Props): NodeJSON {
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
}: JSONProps): NodeJSON {
  const option = nodeOptions.find((option) => option.name === name);
  if (option === undefined) throw new Error(`${name} not found`);

  const { component = () => null, stream, toSave } = option.init({ data });

  return createNode({
    name,
    position,
    id,
    isockets,
    osockets,
    component,
    stream,
    toSave,
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
  id,
}: createNodeProp): NodeJSON {
  console.log("createNode", name);
  const rect = createRect(position);

  const nodeId = id ?? Math.floor(Math.random() * 10 ** 12).toString();

  const _isockets = isockets.map((s, i) => {
    const pAtom = atom((get) => {
      const position = get(rect);
      return {
        ...position,
        y: position.y + get(rect).height / 2 + i * 25,
      };
    });
    return createInputSocket(s, nodeId);
  });

  const _osockets = osockets.map((s, i) => {
    const pAtom = atom((get) => {
      const position = get(rect);
      return {
        ...position,
        x: position.x + get(rect).width,
        y: position.y + get(rect).height / 2 + i * 25,
      };
    });
    return createOutputSocket(s, nodeId);
  });

  return {
    isockets: _isockets,
    osockets: _osockets,
    name,
    //component,
    id: nodeId,
    //stream,
    //toSave,
  };
}
