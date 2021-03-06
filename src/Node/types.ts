import type { Atom } from "jotai";
import type { RectAtom } from "../Rect";
import type { InputSocket, OutputSocket } from "../Socket";

export type Node = {
  rect: RectAtom;
  inputs: InputSocket<unknown>[];
  inputValues: Atom<unknown[]>;
  outputs: OutputSocket<unknown>[];
  name: string;
  component: NodeComponent;
};
export type NodeComponent = React.FC<{ node: Node }>;
export type NodeAtom = Atom<Node>;
