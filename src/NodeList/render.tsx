import React, { ReactElement } from "react";
import { atom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import { createMapAtomFromArray, Stream } from "../Stream"

const range = (n: number) => [...Array(n).keys()];
const option: NodeDefinition = {
  name: "render",
  inputs: range(5).map(() => ({ type: "ReactElement" })),
  init: () => {
    const inputAtoms = range(5).map(() => {
      return createAtomRef(atom<ReactElement | null>(null));
    });

    const componentsAtom = atom((get) => {
      return inputAtoms.map(get).map(get);
    });

    const Render = () => {
      const components = useAtomValue(componentsAtom);
      return (
        <>
          {components.filter(React.isValidElement).map((elem, i) => (
            <g key={i}>{elem}</g>
          ))}
        </>
      );
    };
    const stream: Stream = {
      inputMap: createMapAtomFromArray(inputAtoms as any),
      outputMap: createMapAtomFromArray([]),
    };
    return { stream, component: Render };
  },
};

export default option;
