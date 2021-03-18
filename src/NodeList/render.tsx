import React from "react";
import { atom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import type { Variable } from "../Variable";

const isClassComponent = (c: unknown) =>
  typeof c === "function" && c?.prototype?.isReactComponent;
const isFunctionComponent = (c: unknown) => {
  return (
    typeof c === "function" &&
    String(c).includes("return") &&
    !!String(c).match(/react(\d+)?./i)
  );
};
const isComponent = (c: unknown): c is React.ComponentType =>
  isClassComponent(c) || isFunctionComponent(c);

const range = (n: number) => [...Array(n).keys()];
const option: NodeDefinition = {
  name: "render",
  inputs: range(5).map(() => ({ type: "ComponentType" })),
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
          {components.filter(isComponent).map((Component, i) => (
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
