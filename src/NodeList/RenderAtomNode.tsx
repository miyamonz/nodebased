import React from "react";
import { useAtom } from "jotai";
import type { NodeComponent } from "../Node";

export const RenderAtomNode: NodeComponent = ({ node }) => {
  const [inputs] = useAtom(node.inputValues);

  return <></>;
};
