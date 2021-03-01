import { useAtom } from "jotai";
import type { InputSocketConnected } from "./types";

const ConnectedLine = <T,>({ input }: { input: InputSocketConnected<T> }) => {
  const [pos] = useAtom(input.position);
  const [connection] = useAtom(input.connection);
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

export default ConnectedLine;
