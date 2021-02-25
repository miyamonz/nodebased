import React from "react";
import { SVGProvider, useMouseEvent, useTransform } from "../SVGContext";
import { useDragAtom } from "../Mouse";
import { NodeMenu } from "../NodeMenu";
import { RenderAllNode } from "../Node";
import { RenderSelectRect, RenderBoundingRect } from "../Select";

import { TmpConnectLine } from "../Connect";

function SVGContent() {
  const [drag, setDrag] = useDragAtom();
  const isDown = React.useRef<"mouse" | null>(null);
  const e = useMouseEvent();
  const transform = useTransform();

  React.useEffect(() => {
    if (e === null) return;
    const { x, y } = transform(e);
    const position = { x, y };
    if (e.type === "mousedown") {
      isDown.current = "mouse";
      setDrag({ type: "down", position });
    } else if (e.type === "mousemove") {
      setDrag({
        type: isDown.current === "mouse" ? "drag" : "move",
        position,
      });
    } else if (e.type === "mouseup") {
      isDown.current = null;
      setDrag({ type: "up", position });
    }
  }, [e]);

  return (
    <>
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
    </>
  );
}

function SvgCanvas({ width, height }: { width: number; height: number }) {
  return (
    <SVGProvider viewBox={`0 0 ${width} ${height}`}>
      <SVGContent />
    </SVGProvider>
  );
}

export default SvgCanvas;
