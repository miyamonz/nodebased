import React from "react";
import { atom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { createAtomRef } from "../AtomRef";
import type { Variable } from "../Variable";

const range = (n: number) => [...Array(n).keys()];
const option = {
  name: "render",
  init: () => {
    const inputAtoms = range(5).map(() => {
      return createAtomRef(atom<React.ComponentType | null>(null));
    });

    const componentsAtom = atom((get) => {
      return inputAtoms.map(get).map(get);
    });

    const Render = () => {
      const components = useAtomValue(componentsAtom);
      return (
        <>
          {components
            .filter((c): c is React.ComponentType => c !== null)
            .map((Component, i) => (
              <Component key={i} />
            ))}
        </>
      );
    };
    const variable: Variable = {
      inputAtoms: atom(() => inputAtoms as any),
      outputAtoms: atom(() => []),
    };
    return { variable, component: Render };
  },
};

export default option;
