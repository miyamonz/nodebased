import type { Atom, PrimitiveAtom } from "jotai";
import type { RectAtom } from "../types";
import type { InputSocket, OutputSocket } from "../Socket";
import type { Operator } from "../Operator";

type Input<T> = Atom<T> | PrimitiveAtom<T>;
// TODO: PrimitiveAtom is not covariance
// you can't assign PrimitiveAtom<X> into PrimitiveAtom<X | Y>
export type InputAtom<T> = PrimitiveAtom<Input<T>>;
export type OutputAtom<T> = Atom<T>;

export type Node = {
  rect: RectAtom;
  inputs: InputSocket<unknown>[];
  output: OutputSocket<unknown>;
  op: Operator;
};
export type NodeComponent = React.FC<{ node: Node }>;
export type NodeAtom = PrimitiveAtom<Node>;

export type NodeFn<IN = unknown, OUT = unknown> = (
  inputs: InputAtom<IN>[]
) => OutputAtom<OUT>;
