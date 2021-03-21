import React from "react";
import { atom, useAtom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";

import type { NodeDefinition } from "./types";

import { createAtomRef } from "../AtomRef";
import type { AtomRef } from "../AtomRef";
import type { NodeComponent } from "../Node";
import type { Stream } from "../Stream";

function getComponent(
  inputRef: AtomRef<number>,
  internalAtom: PrimitiveAtom<number>,
  outputAtom: Atom<number>
) {
  function useConnected() {
    const [inputAtom] = useAtom(inputRef);
    const isConnected = !("write" in inputAtom);
    return isConnected;
  }
  const SliderNode: NodeComponent = ({ node }) => {
    const isConnected = useConnected();

    const [, setInput] = useAtom(internalAtom);
    const [rect] = useAtom(node._rect);
    const [num] = useAtom(outputAtom);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isConnected) return;
      const value = parseInt(e.target.value, 10);
      setInput(value);
    };
    return (
      <>
        <foreignObject {...rect} y={rect.y + rect.height} height={20}>
          <input
            type="range"
            min={0}
            max={100}
            value={num}
            onChange={onChange}
          />
        </foreignObject>
      </>
    );
  };
  return React.memo(SliderNode);
}

const option: NodeDefinition<number> = {
  name: "slider",
  inputs: [{ type: "number" }],
  outputs: [{ type: "number" }],
  save: 0,

  init({ data }) {
    const initialValue: number = typeof data === "number" ? data : 0;
    const inputRef = createAtomRef(atom(initialValue));
    const internalAtom = atom(initialValue);

    const outputAtom = atom((get) => {
      const inputAtom = get(inputRef);
      const isConnected = !("write" in inputAtom);
      if (isConnected) return get(inputAtom);
      return get(internalAtom);
    });

    const stream: Stream = {
      // @ts-ignore
      id: Math.random(),
      inputAtoms: atom(() => [inputRef as any]),
      outputAtoms: atom(() => [outputAtom]),
    };
    const component = getComponent(inputRef, internalAtom, outputAtom);
    return { stream, component, toSave: internalAtom };
  },
};

export default option;
