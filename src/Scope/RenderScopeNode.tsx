import React from "react";
import { useAtom } from "jotai";
import { Scope } from "./types";
import { RenderNode } from "../Node";

const RenderScopeNode: React.FC<{ scope: Scope }> = ({ scope }) => {
  const [nodes] = useAtom(scope.nodes);
  return (
    <>
      {nodes.map((nodeAtom) => {
        return <RenderNode key={nodeAtom.toString()} nodeAtom={nodeAtom} />;
      })}
    </>
  );
};

export default React.memo(RenderScopeNode);
