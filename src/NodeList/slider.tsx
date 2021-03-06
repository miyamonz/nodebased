import React from "react";
import { atom, useAtom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import { createAtomRef } from "../AtomRef";
import type { AtomRef } from "../AtomRef";
import type { NodeComponent } from "../Node";

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
    const [rect] = useAtom(node.rect);
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

const option = {
  name: "slider",
  init: () => {
    const inputRef = createAtomRef(atom(0));
    const internalAtom = atom(0);

    const outputAtom = atom((get) => {
      const inputAtom = get(inputRef);
      const isConnected = !("write" in inputAtom);
      if (isConnected) return get(inputAtom);
      return get(internalAtom);
    });

    const inputAtoms = [inputRef];
    const outputAtoms = [outputAtom];
    const variable = { inputAtoms, outputAtoms };
    const component = getComponent(inputRef, internalAtom, outputAtom);
    return { variable, component };
  },
};

export default option;
