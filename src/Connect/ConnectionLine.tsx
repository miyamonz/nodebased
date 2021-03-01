import { useAtom } from "jotai";
import type { Connection } from "./types";

const ConnectionLine = <T,>({ connection }: { connection: Connection<T> }) => {
  const [pos] = useAtom(connection.to.position);
  const [fromPos] = useAtom(connection.from.position);
  const arm = Math.abs(fromPos.x - pos.x) / 3;

  return (
    <>
      {/*
      <line stroke="blue" x1={pos.x} y1={pos.y} x2={fromPos.x} y2={fromPos.y} />
      */}
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

export default ConnectionLine;
