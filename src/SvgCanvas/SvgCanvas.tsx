import { SVGProvider } from "../SVGContext";
import { NodeMenu } from "../NodeMenu";
import { useAtomValue } from "jotai/utils";
import { RenderGraph, RenderGraphMenu } from "../Graph";
import { currentGraphJsonAtom } from "../Graph";
import {
  RenderSelectRect,
  RenderBoundingRect,
  SelectCollisionArea,
} from "../Select";

import { TmpEdgeLine } from "../Edge";
import { useDragMoveNode } from "../MoveNode";
import { Paste } from "../Paste";

function SVGContent() {
  useDragMoveNode();
  const graphJson = useAtomValue(currentGraphJsonAtom);
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
      <TmpEdgeLine />
      {graphJson && <RenderGraph jsonAtom={currentGraphJsonAtom} />}
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
