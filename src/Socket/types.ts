import type { Atom } from "jotai";
import type { PositionAtom } from "../Position";

export type Socket = {
  name: string | number;
  position: PositionAtom;
};
export type InputSocket<T> = Socket & {
  type: "input";
};
export type InputSocketAtom<T> = Atom<InputSocket<T>>;

export type OutputSocket<T> = Socket & {
  type: "output";
};
export type OutputSocketAtom<T> = Atom<OutputSocket<T>>;

export type SocketJSON = {
  name: string | number;
};
export type InputSocketJSON = {
  type: "input";
  name: string | number;
};
export type OutputSocketJSON = {
  type: "output";
  name: string | number;
};
