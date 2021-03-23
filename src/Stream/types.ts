import type { Atom } from "jotai";
import type { AtomRef } from "../AtomRef";

export type InputAtom<T> = AtomRef<T>;
export type OutputAtom<T> = Atom<T>;

export type MapAtom<Key, Value> = Atom<Map<Key, Value>>;

export type SocketName = string | number;
export type Stream = {
  inputMap: MapAtom<SocketName, InputAtom<unknown>>;
  outputMap: MapAtom<SocketName, OutputAtom<unknown>>;
};
