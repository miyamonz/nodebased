import type { Atom, PrimitiveAtom } from "jotai";

export const isPrimitive = <T>(a: Atom<T>): a is PrimitiveAtom<T> => {
  return a.hasOwnProperty("write");
};
