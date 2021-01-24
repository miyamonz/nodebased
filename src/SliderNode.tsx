import { atom, useAtom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";

const SliderComponent = ({
  inputAtom,
  ...props
}: {
  inputAtom: PrimitiveAtom<number>;
}) => {
  const [input, setInput] = useAtom(inputAtom);
  return (
    <>
      <text {...props}>{input} </text>
      <foreignObject {...props} width={100} height={50}>
        <input
          type="range"
          min={0}
          max={100}
          value={input}
          onChange={(e) => setInput(parseInt(e.target.value, 10))}
        />
      </foreignObject>
    </>
  );
};

const createSliderAtom = () => {
  return atom();
};
