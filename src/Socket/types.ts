import type { Atom } from "jotai";
import type { PositionAtom } from "../Position";
import type { NodeJSON } from "../Node";

export type SocketJSON = {
  name: string | number;
};
export type InputSocketJSON = SocketJSON & {
  type: "input";
  from?: OutputSocketJSON;
};
export type OutputSocketJSON = SocketJSON & {
  type: "output";
};

export type Socket = SocketJSON & {
  _nodeId: NodeJSON["id"];
  _position: PositionAtom;
};
export type InputSocket<T> = Socket & {
  type: "input";
  from?: OutputSocket<T>;
};

export type OutputSocket<T> = Socket & {
  type: "output";
};

export type InputSocketAtom<T> = Atom<InputSocket<T>>;
export type OutputSocketAtom<T> = Atom<OutputSocket<T>>;
