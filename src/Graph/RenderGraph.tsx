import React from "react";
import { useAtom } from "jotai";
import { WritableAtom } from "jotai";
import { useAtomCallback, useAtomValue } from "jotai/utils";
import { Graph, GraphJSON } from "./types";
import { RenderNode } from "../Node";
import { RenderConnectionLines } from "../Connect";
import { jsonToGraph } from "./json";

import { currentGraphAtom } from "../actions";
import { graphStackAtom } from "../Graph/atoms";

function useCreateGraphFromJson(jsonAtom: WritableAtom<GraphJSON, GraphJSON>) {
  const [graph, setGraph] = useAtom(currentGraphAtom);
  const callback = useAtomCallback<Graph>(
    React.useCallback(
      (get, _set) => {
        const json = get(jsonAtom);
        console.log("create graph from ", json);
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
  const connections = useAtomValue(graph.connections);
  return (
    <>
      <RenderConnectionLines connections={connections} />
      {nodes.map((node) => {
        return <RenderNode key={node.id} node={node} />;
      })}
    </>
  );
}

export default React.memo(RenderGraph);
