import React from "react";
import { useAtom } from "jotai";
import { WritableAtom } from "jotai";
import { useAtomCallback, useAtomValue } from "jotai/utils";
import { Graph, GraphJSON } from "./types";
import { RenderNode } from "../Node";
import { RenderEdgeLines } from "../Edge";
import { jsonToGraph } from "./json";

import { currentGraphAtom } from "../actions";
import { graphStackAtom } from "../Graph/atoms";
import { GraphEffect } from "./effect";

function useCreateGraphFromJson(jsonAtom: WritableAtom<GraphJSON, GraphJSON>) {
  const [graph, setGraph] = useAtom(currentGraphAtom);
  const callback = useAtomCallback(
    React.useCallback(
      (get, _set) => {
        const json = get(jsonAtom);
        return jsonToGraph(get)(json);
      },
      [jsonAtom.toString()]
    )
  );
  const [stack] = useAtom(graphStackAtom);
  React.useEffect(() => {
    callback().then(setGraph);
  }, [stack.length]);
  return graph;
}

const RenderGraph: React.FC<{
  jsonAtom: WritableAtom<GraphJSON, GraphJSON>;
}> = ({ jsonAtom }) => {
  const graph = useCreateGraphFromJson(jsonAtom);
  return <>{graph && <Render graph={graph} />}</>;
};

function Render({ graph }: { graph: Graph }) {
  const nodes = useAtomValue(graph.nodes);
  const edges = useAtomValue(graph.edges);
  return (
    <>
      <GraphEffect graph={graph} />
      <RenderEdgeLines edges={edges} />
      {nodes.map((node) => {
        return <RenderNode key={node.id} node={node} />;
      })}
    </>
  );
}

export default React.memo(RenderGraph);
