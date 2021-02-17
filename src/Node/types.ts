import type { Atom, PrimitiveAtom } from "jotai";
import type { RectAtom } from "../types";
import type { InputSocket, OutputSocket } from "../Socket";
import type { Operator } from "../Operator";

type Input<T> = Atom<T> | PrimitiveAtom<T>;
export type InputAtom<T> = PrimitiveAtom<Input<T>>;
export type OutputAtom<T> = Atom<T>;

export type Node<I, O> = {
  rect: RectAtom;
  inputs: InputSocket<I>[];
  output: OutputSocket<O>;
  op: Operator;
};
export type NodeAtom<I, O> = PrimitiveAtom<Node<I, O>>;
