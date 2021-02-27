import type { Atom } from "jotai";
import type { RectAtom } from "../Rect";
import type { InputSocket, OutputSocket } from "../Socket";

export type Node = {
  rect: RectAtom;
  inputs: Atom<InputSocket<unknown>[]>;
  inputValues: Atom<unknown[]>;
  output: OutputSocket<unknown>;
  name: string;
  component: NodeComponent;
};
export type NodeComponent = React.FC<{ node: Node }>;
export type NodeAtom = Atom<Node>;
