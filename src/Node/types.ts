import type { PrimitiveAtom } from "jotai";
import type { RectAtom } from "../types";
import type { InputSocket, OutputSocket } from "../Socket";
import type { Operator } from "../Operator";

export type Node = {
  rect: RectAtom;
  inputs: InputSocket<unknown>[];
  output: OutputSocket<unknown>;
  op: Operator;
};
export type NodeComponent = React.FC<{ node: Node }>;
export type NodeAtom = PrimitiveAtom<Node>;
