import React, { useEffect } from "react";
import { atom } from "jotai";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { Graph } from "../Graph";
import type { Node } from "./types";
import { EdgeEffect, Edge } from "../Edge";

export const useNodeEffect = (node: Node) => {
  const mount = useUpdateAtom(mountNodeAtom);
  const unmount = useUpdateAtom(unmountNodeAtom);
  useEffect(() => {
    mount(node);
    return () => {
      unmount(node);
    };
  }, []);
};

function NodeEffect({ graph, node }: { graph: Graph; node: Node }) {
  useNodeEffect(node);
  const [edges] = useAtom(graph.edges);
  const [inputs] = useAtom(node.isockets);
  return (
    <>
      {inputs
        .map((input) => edges.find((e) => e.to === input))
        .filter((edge): edge is Edge<unknown> => edge !== undefined)
        .map((edge) => {
          const key = `${edge.from.nodeId}${edge.from.name}-${edge.to.nodeId}${edge.to.name}`;
          return <EdgeEffect graph={graph} key={key} edge={edge} />;
        })}
    </>
  );
}
const NodeEffectMemo = React.memo(NodeEffect);
export { NodeEffectMemo as NodeEffect };

const mountNodeAtom = atom(null, async (_get, set, node: Node) => {});

const unmountNodeAtom = atom(null, (_get, set, node: Node) => {});
