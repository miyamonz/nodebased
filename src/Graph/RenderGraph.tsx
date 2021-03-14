import React from "react";
import { useAtomValue } from "jotai/utils";
import { Graph } from "./types";
import { RenderNode } from "../Node";
import { RenderConnectionLines } from "../Connect";
import { useConnect } from "../Connect";

const RenderGraph: React.FC<{ graph: Graph }> = ({ graph }) => {
  const nodes = useAtomValue(graph.nodes);
  const setConnect = useConnect();
  const connections = useAtomValue(graph.connections);
  React.useEffect(() => {
    setConnect(connections);
  }, [connections]);
  return (
    <>
      <RenderConnectionLines connections={connections} />
      {nodes.map((node) => {
        return <RenderNode key={node.id} node={node} />;
      })}
    </>
  );
};

export default React.memo(RenderGraph);
