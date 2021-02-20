import React from "react";
import { useAtom } from "jotai";
import type { NodeComponent } from "../Node";

export const RenderAtomNode: NodeComponent = ({ node }) => {
  const isocket = node.inputs[0];
  const [inputAtom] = useAtom(isocket.atom);
  const [input] = useAtom(inputAtom);

  const [rect] = useAtom(node.rect);

  return (
    <>{typeof input === "object" && React.isValidElement(input) && input}</>
  );
};
