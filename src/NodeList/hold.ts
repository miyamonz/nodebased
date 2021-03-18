import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import type { Variable } from "../Variable";

const isPosition = (a: any): a is { x: number; y: number } => {
  return typeof a?.x === "number" && typeof a?.y === "number";
};

const option: NodeDefinition = {
  name: "hold",
  inputs: [{ type: "boolean" }],
  outputs: [{ type: "boolean" }],
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
    const variable: Variable = {
      inputAtoms: atom(() => [condAtom, inputAtom as any]),
      outputAtoms: atom(() => [outAtom]),
    };
    return { variable };
  },
};
export default option;
