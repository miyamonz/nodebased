import React from "react";
import { atom, useAtom } from "jotai";
import type { Atom } from "jotai";
import { useCreateInstanceNode } from "./funcs";
import type { Node, NodeComponent } from "../Node";
//import { usePushGraphJSON } from "../Graph";
import type { GraphJSON } from "../Graph";
import { jsonToGraph } from "../Graph";
import { RenderNode } from "../Node";
import { ConnectAtomLogic } from "../Connect/ConnectionLine";

export function createComponent(graphJsonAtom: Atom<GraphJSON>) {
  const graphAtom = atom((get) => jsonToGraph(get)(get(graphJsonAtom)));

  const GraphNode: NodeComponent = ({ node }) => {
    //const pushGraphJSON = usePushGraphJSON();
    const [rect] = useAtom(node.rect);

    const [graph] = useAtom(graphAtom);
    const [connections] = useAtom(graph.connections);

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
        {connections.map((c) => {
          return (
            <ConnectAtomLogic key={c.to.position.toString()} connection={c} />
          );
        })}
        <g>
          <rect {...instancedRect} fill="lightblue" />
          {instanceNode && <RenderNode node={instanceNode} />}
        </g>
      </>
    );
  };
  return GraphNode;
}
