import React from "react";
import { useAtom } from "jotai";
import { useMouseToConnect } from "./atoms";
import { useMousePosition } from "../SVGContext";
import { useConnectTarget } from "../Socket";
import type { OutputSocket } from "../Socket";

const TmpConnectLineImpl = <T,>({ socket }: { socket: OutputSocket<T> }) => {
  const [socketPos] = useAtom(socket.position);
  const mousePos = useMousePosition();
  return (
    <line
      x1={socketPos.x}
      y1={socketPos.y}
      x2={mousePos.x}
      y2={mousePos.y}
      stroke="red"
    />
  );
};
const TmpConnectLine = () => {
  useMouseToConnect();
  const connectTarget = useConnectTarget();
  if (connectTarget) {
    return <TmpConnectLineImpl socket={connectTarget} />;
  }
  return null;
};

export default TmpConnectLine;
