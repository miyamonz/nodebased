import React from "react";
import { SVGProvider } from "../SVGContext";
import { NodeMenu } from "../NodeMenu";
import { useAtom } from "jotai";
import { currentScopeAtom, RenderScopeNode } from "../Scope";
import {
  RenderSelectRect,
  RenderBoundingRect,
  SelectCollisionArea,
} from "../Select";
import { RenderConnectionLines } from "../Connect";

import { TmpConnectLine } from "../Connect";
import { useDragMoveNode } from "../MoveNode";
import { Paste } from "../Paste";

function SVGContent() {
  useDragMoveNode();
  const [scope] = useAtom(currentScopeAtom);
  return (
    <>
      <Paste />
      <text x={0} y={20}>
        nodebased
      </text>
      <SelectCollisionArea />
      <RenderBoundingRect />
      <RenderSelectRect />
      <RenderConnectionLines />
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
