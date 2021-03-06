import React from "react";
import { useAtomValue } from "jotai/utils";
import { useMouseToConnect } from "./drag";
import { connectTargetAtom } from "./atoms";
import { useMousePosition } from "../SVGContext";
import type { OutputSocket } from "../Socket";

const TmpConnectLineImpl = <T,>({ socket }: { socket: OutputSocket<T> }) => {
  const socketPos = useAtomValue(socket.position);
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
  const connectTarget = useAtomValue(connectTargetAtom);

  if (connectTarget) {
    return <TmpConnectLineImpl socket={connectTarget} />;
  }
  return null;
};

export default TmpConnectLine;
