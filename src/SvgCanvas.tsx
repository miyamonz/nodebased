import React from "react";
import { useAtom } from "jotai";
import { nodeAtomListAtom, addNodeAtom, dragAtom } from "./atoms";
import { OutputSocket, connectTargetAtom } from "./atoms";
import RenderNode from "./RenderNode";

const useKeyDown = (code: string, handler: any) => {
  const listener = React.useCallback(
    (e) => {
      if (e.code === code) handler(e);
    },
    [code]
  );
  React.useEffect(() => {
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [listener]);

  return;
};

const TmpConnectLine = React.memo(({ socket }: { socket: OutputSocket }) => {
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
});

function SvgCanvas({ width, height }: { width: number; height: number }) {
  const [nodeAtomList] = useAtom(nodeAtomListAtom);
  const [, addAtom] = useAtom(addNodeAtom);
  const [, setDrag] = useAtom(dragAtom);
  const [connectTarget] = useAtom(connectTargetAtom);
  useKeyDown("Space", () => addAtom());
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      onMouseDown={(e) => {
        setDrag([e.clientX, e.clientY]);
      }}
      onMouseMove={(e) => {
        setDrag([e.clientX, e.clientY]);
      }}
      onMouseUp={() => {
        setDrag("end");
      }}
    >
      <text x={0} y={20}>
        nodebased
      </text>
      {nodeAtomList.map((atom) => {
        return <RenderNode key={atom.toString()} atom={atom} />;
      })}
      {connectTarget && <TmpConnectLine socket={connectTarget} />}
    </svg>
  );
}

export default SvgCanvas;
