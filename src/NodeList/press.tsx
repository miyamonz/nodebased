import React, { ReactElement } from "react";
import { atom } from "jotai";
import type { WritableAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { NodeDefinition, IOType } from "./types";
import { createMapAtomFromArray, Stream } from "../Stream";

function getElement(
  elem: ReactElement,
  pressAtom: WritableAtom<boolean, boolean>
) {
  const Component = (props: any) => {
    const set = useUpdateAtom(pressAtom);

    React.useEffect(() => {
      const handle = () => set(false);
      window.addEventListener("mouseup", handle);
      return () => window.removeEventListener("mouseup", handle);
    }, []);

    return React.cloneElement(elem, {
      ...props,
      onMouseDown: (e: React.MouseEvent<Element>) => {
        set(true);
        props?.onMouseDown?.(e);
      },
    });
  };

  return <Component />;
}

const inputs: IOType[] = [{ type: "ReactElement" }];
const outputs: IOType[] = [{ type: "ReactElement" }, { type: "boolean" }];
const option: NodeDefinition = {
  name: "press",
  inputs,
  outputs,

  init: () => {
    const elemAtom = atom(atom<ReactElement | null>(null));
    const pressAtom = atom(false);

    const outputAtoms = [
      atom((get) => {
        const elem = get(get(elemAtom));

        if (!React.isValidElement(elem)) return null;
        return getElement(elem, pressAtom);
      }),
      pressAtom,
    ];
    const stream: Stream = {
      inputMap: createMapAtomFromArray([elemAtom as any]),
      outputMap: createMapAtomFromArray(
        outputAtoms,
        outputs.map((s) => s.name)
      ),
    };
    return { stream };
  },
};

export default option;
