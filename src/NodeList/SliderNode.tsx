import React from "react";
import { useAtom } from "jotai";
import type { NodeComponent } from "../Node";
import { InputSocket, isConnected } from "../Socket";

export const SliderNode: NodeComponent = ({ node }) => {
  const isocket = node.inputs[0];
  const [, setInput] = useAtom(isocket.atom);

  const [num] = useAtom(node.output.atom);

  const [rect] = useAtom(node.rect);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isConnected(isocket)) return;
    const value = parseInt(e.target.value, 10);

    // TODO: send this value input output
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
