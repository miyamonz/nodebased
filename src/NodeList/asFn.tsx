import { useMemo, useEffect } from "react";
import { atom, useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import type { Node } from "../Node";
import type { NodeComponent } from "../Node";
import { useMouseStream } from "../SVGContext";

import { grabbedNodeAtom } from "../MoveNode";
import { intersect } from "../Rect";
import { useRemoveNode } from "../actions";

const grabbedRectAtom = atom((get) => {
  const node = get(grabbedNodeAtom);
  if (node === null) return null;
  return get(node.rect);
});

function getComponent(dropNodeAtom: PrimitiveAtom<Node | null>) {
  const RenderDropArea: NodeComponent = ({ node }) => {
    const [dropNode, setDropNode] = useAtom(dropNodeAtom);
    const rect = useAtomValue(node.rect);
    const grabbed = useAtomValue(grabbedNodeAtom);
    const grabbedRect = useAtomValue(grabbedRectAtom);
    const isIntersect = useMemo(() => {
      if (grabbed === node) return false;
      if (!grabbedRect) return false;
      return intersect(rect)(grabbedRect);
    }, [grabbedRect?.x, grabbedRect?.y]);

    const remove = useRemoveNode();
    const { end } = useMouseStream(grabbedRect === null);
    useEffect(() => {
      if (end && isIntersect && grabbed) {
        setDropNode(grabbed);
        remove(grabbed);
      }
    }, [end?.x, end?.y, isIntersect]);
    const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };

    return (
      <>
        <text x={rect.x} y={center.y + 20}>
          {dropNode && dropNode.name}
        </text>
        <rect
          {...rect}
          fill="none"
          stroke={isIntersect ? "blue" : "transparent"}
        />
      </>
    );
  };
  return RenderDropArea;
}

const option = {
  name: "asFn",
  init: () => {
    const nodeAtom = atom<Node | null>(null);
    const component = getComponent(nodeAtom);

    const inputAtoms = [] as any;
    // TODO: set some function from node info
    const outValueAtom = atom((get) => get(nodeAtom)?.name);
    const outputAtoms = [outValueAtom];
    const variable = { inputAtoms, outputAtoms };
    return { variable, component };
  },
};

export default option;
