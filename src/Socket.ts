import type { Atom, PrimitiveAtom } from "jotai";
import type { PositionAtom, InputAtom, OutputAtom } from "./atoms";

type Socket = {
  type: string;
  position: PositionAtom;
};
export type InputSocket<T> = Socket & {
  type: "input";
  atom: InputAtom<T>;
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

export function isConnected<T>(
  isocket: InputSocket<T>
): isocket is InputSocketConnected<T> {
  return isocket.from !== null;
}

export type OutputSocket<T> = Socket & {
  type: "output";
  atom: OutputAtom<T>;
};
