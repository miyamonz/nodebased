import React from "react";
import { useAtom } from "jotai";
import { dragAtom, connectTargetAtom } from "./atoms";
import type { OutputSocket } from "./atoms";

const TmpConnectLine_ = <T extends unknown>({
  socket,
}: {
  socket: OutputSocket<T>;
}) => {
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
    return <TmpConnectLine_ socket={connectTarget} />;
  }
  return null;
};

export default TmpConnectLine;
