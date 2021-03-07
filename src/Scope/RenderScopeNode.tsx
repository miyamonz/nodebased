import React from "react";
import { useAtom } from "jotai";
import { Scope } from "./types";
import { RenderNode } from "../Node";

const RenderScopeNode: React.FC<{ scope: Scope }> = ({ scope }) => {
  const [nodes] = useAtom(scope.nodes);
  return (
    <>
      {nodes.map((node) => {
        return <RenderNode key={node.id} node={node} />;
      })}
    </>
  );
};

export default React.memo(RenderScopeNode);
