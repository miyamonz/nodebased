import React from "react";
import { useAtomValue } from "jotai/utils";
import { Graph } from "./types";
import { RenderNode } from "../Node";
import { RenderConnectionLines } from "../Connect";
import { getConnections } from "../Connect/atoms";

const RenderGraph: React.FC<{ graph: Graph }> = ({ graph }) => {
  const nodes = useAtomValue(graph.nodes);
  const connectionsAtom = React.useMemo(() => getConnections(nodes), [nodes]);
  const connections = useAtomValue(connectionsAtom);
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
