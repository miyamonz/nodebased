import type { Atom } from "jotai";
import type { RectAtom } from "../types";
import type { InputSocket, OutputSocket } from "../Socket";

export type Node = {
  rect: RectAtom;
  inputs: InputSocket<unknown>[];
  output: OutputSocket<unknown>;
  name: string;
  component: NodeComponent;
};
export type NodeComponent = React.FC<{ node: Node }>;
export type NodeAtom = Atom<Node>;
