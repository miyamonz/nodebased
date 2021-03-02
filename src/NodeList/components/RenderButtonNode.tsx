import { useState, useMemo } from "react";
import { useAtom } from "jotai";
import type { NodeComponent } from "../../Node";

export const RenderButtonNode: NodeComponent = ({ node }) => {
  const [rect] = useAtom(node.rect);
  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  const [isDown, setDown] = useAtom(node.state);

  const r = useMemo(() => (Math.min(rect.width, rect.height) / 2) * 0.8, [
    rect.width,
    rect.height,
  ]);

  return (
    <>
      <circle
        cx={center.x}
        cy={center.y}
        onMouseDown={() => setDown(true)}
        onMouseUp={() => setDown(false)}
        r={r}
        stroke="blue"
        fill={isDown ? "blue" : "transparent"}
      />
    </>
  );
};

export default RenderButtonNode;
