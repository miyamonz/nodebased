import React from "react";
import { atom, useAtom } from "jotai";
import type { Atom } from "jotai";
import type { NodeComponent } from "../Node";
import { usePushGraphJSON } from "../Graph";
import type { GraphJSON, Graph } from "../Graph";
import { useCreateGraph } from "../Graph";
import { RenderGraph } from "../Graph";

function useGraph(graphJsonAtom: Atom<GraphJSON>) {
  const createGraph = useCreateGraph();
  const [json] = useAtom(graphJsonAtom);
  const graph = React.useMemo(() => createGraph(json), [json]);
  return graph;
}

export function createComponent(graphJsonAtom: Atom<GraphJSON>) {
  const GraphNode: NodeComponent = ({ node }) => {
    const pushGraphJSON = usePushGraphJSON();
    const [rect] = useAtom(node.rect);
    const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };

    const graph = useGraph(graphJsonAtom);
    const instancedRect = { ...rect, y: rect.y + rect.height };

    return (
      <>
        <text {...center}>graph</text>
        <g>
          <rect {...instancedRect} fill="lightblue" />
          <RenderGraph graph={graph} />
        </g>
      </>
    );
  };
  return GraphNode;
}
