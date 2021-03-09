import React from "react";
import { useAtomValue } from "jotai/utils";
import { Graph } from "./types";
import { RenderNode } from "../Node";

const RenderGraph: React.FC<{ graph: Graph }> = ({ graph }) => {
  const nodes = useAtomValue(graph.nodes);
  return (
    <>
      {nodes.map((node) => {
        return <RenderNode key={node.id} node={node} />;
      })}
    </>
  );
};

export default React.memo(RenderGraph);
