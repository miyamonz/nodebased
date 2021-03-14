import type { Atom } from "jotai";
import type { OutputAtom } from "../Variable";
import type { PositionAtom } from "../Position";
import type { AtomRef } from "../AtomRef";
import type { Connection } from "../Connect";

type Socket = {
  type: string;
  position: PositionAtom;
};
export type InputSocket<T> = Socket & {
  type: "input";
  ref: AtomRef<T>;
  atom: Atom<T>;
  //connection: Atom<Connection<T> | null>;
};
export type InputSocketAtom<T> = Atom<InputSocket<T>>;

export type OutputSocket<T> = Socket & {
  type: "output";
  atom: OutputAtom<T>;
};
export type OutputSocketAtom<T> = Atom<OutputSocket<T>>;
