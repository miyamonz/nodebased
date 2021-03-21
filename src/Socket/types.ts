import type { Atom } from "jotai";
import type { PositionAtom } from "../Position";
import type { Node } from "../Node";

export type Socket = {
  name: string | number;
  position: PositionAtom;
  nodeId: Node["id"];
};
export type InputSocket<T> = Socket & {
  type: "input";
  from?: OutputSocket<T>;
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
  from?: {
    nodeId: Node["id"];
    socketName: OutputSocketJSON["name"];
  };
};
export type OutputSocketJSON = {
  type: "output";
  name: string | number;
};
