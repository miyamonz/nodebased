import React from "react";
import { atom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { createAtomRef } from "../AtomRef";
import type { Variable } from "../Variable";

const range = (n: number) => [...Array(n).keys()];
const option = {
  name: "g",
  init: () => {
    const inputAtoms = range(5).map(() => {
      return createAtomRef(atom<React.ComponentType | null>(null));
    });

    const componentsAtom = atom((get) => {
      return inputAtoms.map(get).map(get);
    });

    const G = (props: JSX.IntrinsicElements["g"]) => {
      const components = useAtomValue(componentsAtom);
      return (
        <g {...props}>
          {components
            .filter(
              (c): c is React.ComponentType =>
                c !== null && c !== undefined && typeof c === "function"
            )
            .map((Component, i) => (
              <Component key={i} />
            ))}
        </g>
      );
    };
    const variable: Variable = {
      inputAtoms: atom(() => inputAtoms as any),
      outputAtoms: atom(() => [atom(() => G)]),
    };
    return { variable };
  },
};

export default option;
