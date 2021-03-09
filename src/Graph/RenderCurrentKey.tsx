import { useAtom } from "jotai";
import { currentKeyAtom } from "./atoms";

const RenderCurrentKey = (props: JSX.IntrinsicElements["g"]) => {
  const [key, setKey] = useAtom(currentKeyAtom);
  return (
    <>
      <g {...props}>
        <text x={0} onClick={() => setKey("")}>
          /
        </text>
        <text x={0} y={20}>
          key: {key}
        </text>
      </g>
    </>
  );
};

export default RenderCurrentKey;
