import React from 'react'
import { useAtom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import { RectAtom } from "../types";

const SliderNode = ({
  inputAtom,
  outputAtom,
  rectAtom,
}: {
  inputAtom: PrimitiveAtom<number>;
  outputAtom: Atom<number>;
  rectAtom: RectAtom;
}) => {
  const [, setInput] = useAtom(inputAtom);
  const [num] = useAtom(outputAtom);
  const [rect] = useAtom(rectAtom);
  return (
    <>
      <foreignObject {...rect} y={rect.y + rect.height}>
        <input
          type="range"
          min={0}
          max={100}
          value={num}
          onChange={(e) => setInput(parseInt(e.target.value, 10))}
        />
      </foreignObject>
    </>
  );
};

export default React.memo(SliderNode);
