import React from "react";
import { useAtom } from "jotai";
import { nodeAtomListAtom, dragAtom, mousePosAtom } from "../atoms";
import { NodeMenu } from "../NodeMenu";
import RenderNode from "../components/RenderNode";

import TmpConnectLine from "../TmpConnectLine";

function SvgCanvas({ width, height }: { width: number; height: number }) {
  const [nodeAtomList] = useAtom(nodeAtomListAtom);

  const [, setDrag] = useAtom(dragAtom);
  const [, setPos] = useAtom(mousePosAtom);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      onMouseDown={(e) => {
        setDrag([e.clientX, e.clientY]);
        setPos([e.clientX, e.clientY]);
      }}
      onMouseMove={(e) => {
        setDrag([e.clientX, e.clientY]);
        setPos([e.clientX, e.clientY]);
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
      <NodeMenu />
    </svg>
  );
}

export default SvgCanvas;
