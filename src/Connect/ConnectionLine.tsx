import { useAtom } from "jotai";
import type { Connection } from "./types";

import { currentNodesAtom } from "../actions";

function useSocket<T>(connection: Connection<T>) {
  const [nodes] = useAtom(currentNodesAtom);

  const [fromNode] = useAtom(nodes[connection.from_[0]]);
  const osocket = fromNode.outputs[connection.from_[1]];

  const [toNode] = useAtom(nodes[connection.to_[0]]);
  const isocket = toNode.inputs[connection.to_[1]];
  return [osocket, isocket];
}
const ConnectionLine = <T,>({ connection }: { connection: Connection<T> }) => {
  const [osocket, isocket] = useSocket(connection);
  const [pos] = useAtom(isocket.position);
  const [fromPos] = useAtom(osocket.position);
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
