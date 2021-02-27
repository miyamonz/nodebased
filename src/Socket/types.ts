import type { Atom, PrimitiveAtom } from "jotai";
import type { InputAtom, OutputAtom } from "../Variable";
import type { PositionAtom } from "../Position";

type Socket = {
  type: string;
  position: PositionAtom;
};
export type InputSocket<T> = Socket & {
  type: "input";
  ref: InputAtom<T>;
  atom: Atom<T>;
  from: OutputSocket<T> | null;
};
export type InputSocketConnected<T> = InputSocket<T> & {
  atom: PrimitiveAtom<Atom<T>>;
  from: OutputSocket<T>;
};
export type InputSocketNotConnected<T> = InputSocket<T> & {
  atom: PrimitiveAtom<PrimitiveAtom<T>>;
  from: null;
};
export type OutputSocket<T> = Socket & {
  type: "output";
  atom: OutputAtom<T>;
};

export function isConnected<T>(
  isocket: InputSocket<T>
): isocket is InputSocketConnected<T> {
  return isocket.from !== null;
}
