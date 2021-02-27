import { atom, Atom, WritableAtom } from "jotai";
export function createAtomRef<T>(initialAtom: Atom<T>): AtomRef<T> {
  const refAtom = atom(initialAtom);
  return refAtom;
}

export type AtomRef<T> = WritableAtom<Atom<T>, Atom<T>>;
