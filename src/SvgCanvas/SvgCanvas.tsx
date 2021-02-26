import React from "react";
import { SVGProvider } from "../SVGContext";
import { NodeMenu } from "../NodeMenu";
import { useAtom } from "jotai";
import { currentScopeAtom, RenderScopeNode } from "../Scope";
import { RenderSelectRect, RenderBoundingRect } from "../Select";

import { TmpConnectLine } from "../Connect";
import { useDragMoveNode } from "../MoveNode";

function SVGContent() {
  useDragMoveNode();
  const [scope] = useAtom(currentScopeAtom);
  return (
    <>
      <text x={0} y={20}>
        nodebased
      </text>
      <RenderBoundingRect />
      <RenderSelectRect />
      <TmpConnectLine />
      {scope && <RenderScopeNode scope={scope} />}
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
