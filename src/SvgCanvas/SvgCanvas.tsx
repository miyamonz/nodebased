import { SVGProvider } from "../SVGContext";
import { NodeMenu } from "../NodeMenu";
import { useAtomValue } from "jotai/utils";
import { currentGraphAtom, RenderGraph, RenderGraphMenu } from "../Graph";
import {
  RenderSelectRect,
  RenderBoundingRect,
  SelectCollisionArea,
} from "../Select";

import { TmpConnectLine } from "../Connect";
import { useDragMoveNode } from "../MoveNode";
import { Paste } from "../Paste";

function SVGContent() {
  useDragMoveNode();
  const graph = useAtomValue(currentGraphAtom);
  return (
    <>
      <Paste />
      <text x={0} y={20}>
        nodebased
      </text>
      <SelectCollisionArea />
      <RenderGraphMenu transform="translate(0 40)" />
      <RenderBoundingRect />
      <RenderSelectRect />
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
