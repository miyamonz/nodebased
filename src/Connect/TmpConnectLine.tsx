import React from "react";
import { useAtom } from "jotai";
import { useMouseToConnect } from "./atoms";
import { dragAtom } from "../Mouse";
import { useConnectTarget } from "../Socket";
import type { OutputSocket } from "../Socket";

const TmpConnectLineImpl = <T,>({ socket }: { socket: OutputSocket<T> }) => {
  const [position] = useAtom(socket.position);
  const [drag] = useAtom(dragAtom);
  useMouseToConnect();
  return (
    <line
      x1={position.x}
      y1={position.y}
      x2={drag.position.x}
      y2={drag.position.y}
      stroke="red"
    />
  );
};
const TmpConnectLine = () => {
  const connectTarget = useConnectTarget();
  if (connectTarget) {
    return <TmpConnectLineImpl socket={connectTarget} />;
  }
  return null;
};

export default TmpConnectLine;
