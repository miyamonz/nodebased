import React from "react";
import { useAtom } from "jotai";
import type { WritableAtom } from "jotai";
import type { NodeComponent } from "../Node";
import { isConnected } from "../Socket";

export const SliderNode: NodeComponent = ({ node }) => {
  const [[isocket]] = useAtom(node.inputs);
  const [inputAtom] = useAtom(isocket.ref);
  // TODO: input socket should be readable only
  const [, setInput] = useAtom(inputAtom as WritableAtom<null, number>);

  const [num] = useAtom(node.output.atom);

  const [rect] = useAtom(node.rect);
  if (typeof num !== "number") return null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isConnected(isocket)) return;
    const value = parseInt(e.target.value, 10);
    setInput(value);
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
