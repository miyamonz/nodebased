import React from "react";
import { atom, useAtom } from "jotai";
import type { Atom } from "jotai";
import { useCreateInstanceNode } from "./funcs";
import type { Node, NodeComponent } from "../Node";
//import { usePushGraphJSON } from "../Graph";
import type { GraphJSON, Graph } from "../Graph";
import { useCreateGraph } from "../Graph";
import { RenderNode } from "../Node";

function useGraph(graphJsonAtom: Atom<GraphJSON>) {
  const createGraph = useCreateGraph();
  const [json] = useAtom(graphJsonAtom);
  const graph = React.useMemo(() => createGraph(json), [json]);
  return graph;
}

export function createComponent(graphJsonAtom: Atom<GraphJSON>) {
  const GraphNode: NodeComponent = ({ node }) => {
    //const pushGraphJSON = usePushGraphJSON();
    const [rect] = useAtom(node.rect);

    const graph = useGraph(graphJsonAtom);
    const instancedRect = { ...rect, y: rect.y + rect.height };
    const createInstance = useCreateInstanceNode({
      position: {
        x: instancedRect.x,
        y: instancedRect.y,
      },
    });

    const [instanceNode, setInstanceNode] = React.useState<Node | null>(null);
    React.useEffect(() => {
      createInstance(graph).then((inode) => {
        const rectAtom = atom(
          (get) => {
            const rect = get(node.rect);
            return { ...rect, y: rect.y + rect.height };
          },
          (_get, _set) => {}
        );
        inode.rect = rectAtom;
        setInstanceNode(inode);
      });
      return () => {};
    }, [graph]);

    return (
      <>
        <g>
          <rect {...instancedRect} fill="lightblue" />
          {instanceNode && <RenderNode node={instanceNode} />}
        </g>
      </>
    );
  };
  return GraphNode;
}
