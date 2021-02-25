import React from "react";
import { SVGProvider, useMouseEvent, useTransform } from "../SVGContext";
import { useDragAtom } from "../Mouse";
import { NodeMenu } from "../NodeMenu";
import { RenderAllNode } from "../Node";
import { RenderSelectRect, RenderBoundingRect } from "../Select";

import { TmpConnectLine } from "../Connect";
import { useDragMoveNode } from "../MoveNode";

function useSetDrag() {
  const [, setDrag] = useDragAtom();

  const e = useMouseEvent();
  const transform = useTransform();
  React.useEffect(() => {
    if (e === null) return;
    const { x, y } = transform(e);
    const position = { x, y };
    setDrag(Object.assign(e, { position }));
  }, [e]);
}
function SVGContent() {
  useSetDrag();

  useDragMoveNode();

  return (
    <>
      <text x={0} y={20}>
        nodebased
      </text>
      <RenderBoundingRect />
      <RenderSelectRect />
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
