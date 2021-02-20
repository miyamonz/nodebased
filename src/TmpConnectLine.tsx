import React from "react";
import { useAtom } from "jotai";
import { dragAtom, connectTargetAtom } from "./Drag";
import type { OutputSocket } from "./Socket";

const TmpConnectLineImpl = <T,>({ socket }: { socket: OutputSocket<T> }) => {
  const [position] = useAtom(socket.position);
  const [pos] = useAtom(dragAtom);
  return (
    <line
      x1={position.x}
      y1={position.y}
      x2={pos[0]}
      y2={pos[1]}
      stroke="red"
    />
  );
};
const TmpConnectLine = () => {
  const [connectTarget] = useAtom(connectTargetAtom);
  if (connectTarget) {
    return <TmpConnectLineImpl socket={connectTarget} />;
  }
  return null;
};

export default TmpConnectLine;
