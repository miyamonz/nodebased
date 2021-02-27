import React from "react";
import { useAtom } from "jotai";
import type { Atom } from "jotai";
import type { NodeComponent } from "../Node";
import { InputSocket, isConnected } from "../Socket";

export const SliderNode: NodeComponent = ({ node }) => {
  const isocket = node.inputs[0] as InputSocket<number>;
  const [inputAtom] = useAtom(isocket.atom);
  const [, setInput] = useAtom(inputAtom);

  const [num] = useAtom(node.output.atom as Atom<number>);

  const [rect] = useAtom(node.rect);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isConnected(isocket)) return;
    // @ts-ignore-next-line
    setInput(parseInt(e.target.value, 10));
  };
  return (
    <>
      <foreignObject {...rect} y={rect.y + rect.height}>
        <input type="range" min={0} max={100} value={num} onChange={onChange} />
      </foreignObject>
    </>
  );
};

export default React.memo(SliderNode);
