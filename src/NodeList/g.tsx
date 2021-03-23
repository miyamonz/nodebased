import React, { ReactElement } from "react";
import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import { createMapAtomFromArray, Stream } from "../Stream";

const range = (n: number) => [...Array(n).keys()];
const option: NodeDefinition = {
  name: "g",
  inputs: range(5).map(() => ({ type: "ReactElement" })),
  outputs: [{ type: "ReactElement" }],
  init: () => {
    const inputAtoms = range(5).map(() => {
      return createAtomRef(atom<ReactElement | null>(null));
    });

    const outAtom = atom((get) => {
      const elements = inputAtoms.map(get).map(get);

      return (
        <g>
          {elements
            .filter((e): e is ReactElement => React.isValidElement(e))
            .map((e, i) => React.cloneElement(e, { key: i }))}
        </g>
      );
    });
    const stream: Stream = {
      inputMap: createMapAtomFromArray(inputAtoms as any),
      outputMap: createMapAtomFromArray([outAtom]),
    };
    return { stream };
  },
};

export default option;
