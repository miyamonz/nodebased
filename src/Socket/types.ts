import type { Atom, PrimitiveAtom } from "jotai";
import type { InputAtom, OutputAtom } from "../Variable";
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
  connection: Atom<Connection<T> | null>;
};
export type InputSocketConnected<T> = InputSocket<T> & {
  atom: PrimitiveAtom<Atom<T>>;
  connection: Atom<Connection<T>>;
};
export type InputSocketNotConnected<T> = InputSocket<T> & {
  atom: PrimitiveAtom<PrimitiveAtom<T>>;
};
export type OutputSocket<T> = Socket & {
  type: "output";
  atom: OutputAtom<T>;
};
