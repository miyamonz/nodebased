import React from "react";
import { atom } from "jotai";
import type { WritableAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { NodeDefinition } from "./types";
import type { Stream } from "../Stream";

function getComponent(
  Component: React.ComponentType | null,
  pressAtom: WritableAtom<boolean, boolean>
) {
  return (props: any) => {
    const set = useUpdateAtom(pressAtom);

    React.useEffect(() => {
      const handle = () => set(false);
      window.addEventListener("mouseup", handle);
      return () => window.removeEventListener("mouseup", handle);
    }, []);

    const isComponent = (c: unknown): c is React.ComponentType =>
      Component !== null || typeof c !== "function";
    if (!isComponent(Component)) return null;
    return (
      <Component
        {...props}
        onMouseDown={(e: React.MouseEvent<Element>) => {
          set(true);
          props?.onMouseDown?.(e);
        }}
      />
    );
  };
}

const option: NodeDefinition = {
  name: "press",
  inputs: [{ type: "ComponentType" }],
  outputs: [{ type: "ComponentType" }, { type: "boolean" }],

  init: () => {
    const componentAtom = atom(atom<React.ComponentType | null>(null));
    const pressAtom = atom(false);

    const outputAtoms = [
      atom((get) => {
        const Component = get(get(componentAtom));

        return getComponent(Component, pressAtom);
      }),
      pressAtom,
    ];
    const stream: Stream = {
      inputAtoms: atom(() => [componentAtom as any]),
      outputAtoms: atom(() => outputAtoms),
    };
    return { stream };
  },
};

export default option;
