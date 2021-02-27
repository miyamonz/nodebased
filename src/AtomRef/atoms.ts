import { atom, Atom, WritableAtom } from "jotai";
export function createAtomRef<T>(initialAtom: Atom<T>) {
  const refAtom = atom(initialAtom);
  const a = atom(
    (get) => get(get(refAtom)),
    (_get, set, newAtom: Atom<T>) => set(refAtom, newAtom)
  );
  return a;
}

export type AtomRef<T> = WritableAtom<T, Atom<T>>;
