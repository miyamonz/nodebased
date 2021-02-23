import React from "react";
import { useDragAtom } from "../Mouse";
import { useSVGMouse } from "./useSvgMouse";
import { NodeMenu } from "../NodeMenu";
import { RenderAllNode } from "../Node";
import { RenderSelectRect, RenderBoundingRect } from "../Select";

import { TmpConnectLine } from "../Connect";

function SvgCanvas({ width, height }: { width: number; height: number }) {
  const [drag, setDrag] = useDragAtom();
  const isDown = React.useRef<"mouse" | null>(null);
  const [ref, transform] = useSVGMouse();
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      onMouseDown={(e) => {
        isDown.current = "mouse";
        const position = transform(e);
        setDrag({ type: "down", position });
      }}
      onMouseMove={(e) => {
        const position = transform(e);
        setDrag({
          type: isDown.current === "mouse" ? "drag" : "move",
          position,
        });
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
      <RenderBoundingRect />
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
