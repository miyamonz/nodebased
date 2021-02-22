import React from "react";
import { useAtom } from "jotai";
import { useSetDragHook } from "../Drag";
import { mousePosAtom } from "../atoms";
import { NodeMenu } from "../NodeMenu";
import { RenderAllNode } from "../Node";

import TmpConnectLine from "../TmpConnectLine";

function SvgCanvas({ width, height }: { width: number; height: number }) {
  const setDrag = useSetDragHook();
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
      <RenderAllNode />
      <NodeMenu />
    </svg>
  );
}

export default SvgCanvas;
