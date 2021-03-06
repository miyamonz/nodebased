import React from "react";
import { atom, useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { createAtomRef } from "../AtomRef";

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
    const outputAtoms = [atom(() => undefined)];
    const variable = { inputAtoms, outputAtoms };
    return { variable, component: Render };
  },
};

export default option;
