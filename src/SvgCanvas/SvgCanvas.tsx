import React from "react";
import { SVGProvider } from "../SVGContext";
import { NodeMenu } from "../NodeMenu";
import { useAtomValue } from "jotai/utils";
import { currentGraph, RenderGraph, RenderCurrentKey } from "../Graph";
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
  const graph = useAtomValue(currentGraph);
  return (
    <>
      <Paste />
      <text x={0} y={20}>
        nodebased
      </text>
      <SelectCollisionArea />
      <RenderCurrentKey transform="translate(100 20)" />
      <RenderBoundingRect />
      <RenderSelectRect />
      <RenderConnectionLines />
      <TmpConnectLine />
      {graph && <RenderGraph graph={graph} />}
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
