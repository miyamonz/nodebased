import { useAtom } from "jotai";
import type { Edge } from "./types";

function useSocket<T>(edge: Edge<T>) {
  const osocket = edge.from;
  const isocket = edge.to;
  return [osocket, isocket] as const;
}

const EdgeLine = <T,>({ edge }: { edge: Edge<T> }) => {
  const [osocket, isocket] = useSocket(edge);

  const [pos] = useAtom(isocket.position);
  const [fromPos] = useAtom(osocket.position);
  const arm = Math.abs(fromPos.x - pos.x) / 3;

  return (
    <>
      <path
        stroke="blue"
        fill="none"
        d={`M ${fromPos.x} ${fromPos.y} C ${fromPos.x + arm} ${fromPos.y}, ${
          pos.x - arm
        } ${pos.y}, ${pos.x} ${pos.y} `}
      />
    </>
  );
};

export default EdgeLine;
