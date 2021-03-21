import React from "react";
import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import type { Stream } from "../Stream";

const range = (n: number) => [...Array(n).keys()];
const option: NodeDefinition = {
  name: "g",
  inputs: range(5).map(() => ({ type: "ComponentType" })),
  outputs: [{ type: "ComponentType" }],
  init: () => {
    const inputAtoms = range(5).map(() => {
      return createAtomRef(atom<React.ComponentType | null>(null));
    });

    const outAtom = atom((get) => {
      const components = inputAtoms.map(get).map(get);

      return (props: JSX.IntrinsicElements["g"]) => {
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
    });
    const stream: Stream = {
      inputAtoms: atom(() => inputAtoms as any),
      outputAtoms: atom(() => [outAtom]),
    };
    return { stream };
  },
};

export default option;
