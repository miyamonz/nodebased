import React from "react";
import { useAtom } from "jotai";
import { nodeAtomListAtom, addNodeAtom, dragAtom } from "./atoms";
import RenderNode from "./components/RenderNode";

import TmpConnectLine from "./TmpConnectLine";

const useKeyDown = (code: string, handler: any) => {
  const listener = React.useCallback(
    (e) => {
      if (e.code === code) handler(e);
    },
    [code, handler]
  );
  React.useEffect(() => {
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [listener]);

  return;
};

function SvgCanvas({ width, height }: { width: number; height: number }) {
  const [nodeAtomList] = useAtom(nodeAtomListAtom);

  const [, addAtom] = useAtom(addNodeAtom);
  useKeyDown("Space", () => addAtom());

  const [, setDrag] = useAtom(dragAtom);
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
      <TmpConnectLine />
      {nodeAtomList.map((atom) => {
        return <RenderNode key={atom.toString()} atom={atom} />;
      })}
    </svg>
  );
}

export default SvgCanvas;
