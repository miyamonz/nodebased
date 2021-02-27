import React from "react";
import { useAtom } from "jotai";
import type { NodeComponent } from "../Node";

export const RenderElementNode: NodeComponent = ({ node }) => {
  const [[isocket]] = useAtom(node.inputs);
  const [input] = useAtom(isocket.atom);

  return (
    <>{typeof input === "object" && React.isValidElement(input) && input}</>
  );
};

export default React.memo(RenderElementNode);
