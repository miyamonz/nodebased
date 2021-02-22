import React from "react";
import { useAtom } from "jotai";
import { useDragAtom } from "../Mouse";
import { useSVGMouse } from "./useSvgMouse";
import { mousePosAtom } from "../atoms";
import { NodeMenu } from "../NodeMenu";
import { RenderAllNode } from "../Node";
import { RenderSelectRect } from "../Select";

import TmpConnectLine from "../TmpConnectLine";

function SvgCanvas({ width, height }: { width: number; height: number }) {
  const [drag, setDrag] = useDragAtom();
  const isDown = React.useRef<"mouse" | null>(null);
  const [ref, transform] = useSVGMouse();
  const [, setPos] = useAtom(mousePosAtom);
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      onMouseDown={(e) => {
        isDown.current = "mouse";
        const position = transform(e);
        setDrag({ type: "down", position });
        setPos([e.clientX, e.clientY]);
      }}
      onMouseMove={(e) => {
        const position = transform(e);
        setDrag({
          type: isDown.current === "mouse" ? "drag" : "move",
          position,
        });
        setPos([e.clientX, e.clientY]);
      }}
      onMouseUp={(e) => {
        isDown.current = null;
        const position = transform(e);
        setDrag({ type: "up", position });
      }}
    >
      <text x={0} y={20}>
        nodebased
      </text>
      <RenderSelectRect />
      <circle
        cx={drag.position.x}
        cy={drag.position.y}
        r={20}
        fill="none"
        stroke="black"
      />
      <TmpConnectLine />
      <RenderAllNode />
      <NodeMenu />
    </svg>
  );
}

export default SvgCanvas;
