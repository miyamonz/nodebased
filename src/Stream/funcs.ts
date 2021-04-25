import { atom } from "jotai";
import type { Atom } from "jotai";
import type { AtomRef } from "../AtomRef";
import type {
  InputAtom,
  OutputAtom,
  SocketName,
  Stream,
  MapAtom,
} from "./types";

export function createMapAtomFromArray<T>(
  arr: T[],
  key?: (SocketName | undefined)[]
): MapAtom<SocketName, T> {
  return atom(new Map(arr.map((anAtom, i) => [key?.[i] ?? i, anAtom])));
}

export function createStream<IN, OUT>(
  inputAtoms: InputAtom<IN>[],
  createOutput: (inputValuesAtom: Atom<IN[]>) => OutputAtom<OUT>
): Stream {
  //@ts-ignore
  const input = atom((get) => inputAtoms.map(get).map(get) as IN[]);
  const outputAtom = createOutput(input);

  const inputMap: Stream["inputMap"] = createMapAtomFromArray(
    inputAtoms as InputAtom<unknown>[]
  );
  const outputMap: Stream["outputMap"] = createMapAtomFromArray([outputAtom]);
  return {
    inputMap,
    outputMap,
  };
}

export function createOneOutputStream<T>(outputAtom: Atom<T>): Stream {
  const inputMap: Stream["inputMap"] = atom(new Map());
  const outputMap: Stream["outputMap"] = createMapAtomFromArray([outputAtom]);
  return {
    inputMap,
    outputMap,
  };
}
export function createOneInputStream<T>(inputAtom: AtomRef<T>): Stream {
  const inputMap: Stream["inputMap"] = createMapAtomFromArray([
    inputAtom,
  ] as InputAtom<unknown>[]);
  const outputMap: Stream["outputMap"] = atom(new Map());
  return {
    inputMap,
    outputMap,
  };
}
