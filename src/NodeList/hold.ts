import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import { createMapAtomFromArray, Stream } from "../Stream";

const isPosition = (a: any): a is { x: number; y: number } => {
  return typeof a?.x === "number" && typeof a?.y === "number";
};

const option: NodeDefinition = {
  name: "hold",
  inputs: [{ type: "boolean" }, { type: "any" }],
  outputs: [{ type: "any" }],
  init: () => {
    const condAtom = createAtomRef(atom(false));
    const inputAtom = createAtomRef(atom<unknown>(null));

    const tmpAtom = atom(null);
    let setter: any;
    tmpAtom.onMount = (set) => {
      setter = set;
    };

    const outAtom = atom((get) => {
      const cond = get(get(condAtom));

      const a = get(get(inputAtom));
      if (cond) {
        setter(a);
      } else {
        if (get(tmpAtom) === null && setter !== undefined) {
          if (isPosition(a)) setter({ x: 0, y: 0 });
        }
      }
      return get(tmpAtom);
    });
    const stream: Stream = {
      inputMap: createMapAtomFromArray([condAtom, inputAtom as any]),
      outputMap: createMapAtomFromArray([outAtom]),
    };
    return { stream };
  },
};
export default option;
