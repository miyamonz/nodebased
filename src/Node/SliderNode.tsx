import React from "react";
import { useAtom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import { RectAtom } from "../types";

type SliderProps = {
  inputAtom: PrimitiveAtom<number>;
  outputAtom: Atom<number>;
  rectAtom: RectAtom;
};
export const SliderNode: React.FC<SliderProps> = ({
  inputAtom,
  outputAtom,
  rectAtom,
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
