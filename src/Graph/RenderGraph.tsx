import React from "react";
import { useAtom } from "jotai";
import { WritableAtom } from "jotai";
import { GraphJSON } from "./types";
import { RenderNode } from "../Node";

import { currentGraphJsonAtom } from "../actions";
import { graphStackAtom } from "../Graph/atoms";
import { GraphEffect } from "./effect";

function useCreateGraphFromJson(jsonAtom: WritableAtom<GraphJSON, GraphJSON>) {
  const [json] = useAtom(jsonAtom);
  const [graph, setGraph] = useAtom(currentGraphJsonAtom);
  const [stack] = useAtom(graphStackAtom);
  React.useEffect(() => {
    setGraph(json);
  }, [stack.length]);
  return graph;
}

const RenderGraph: React.FC<{
  jsonAtom: WritableAtom<GraphJSON, GraphJSON>;
}> = ({ jsonAtom }) => {
  const graph = useCreateGraphFromJson(jsonAtom);
  return <>{graph && <Render graph={graph} />}</>;
};

function Render({ graph }: { graph: GraphJSON }) {
  const nodes = graph.nodes;
  return (
    <>
      <GraphEffect graph={graph} />
      {nodes.map((node) => {
        return <RenderNode key={node.id} node={node} />;
      })}
    </>
  );
}

export default React.memo(RenderGraph);
