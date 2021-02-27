import React from "react";
import { useAtom } from "jotai";
import type { NodeComponent } from "../Node";

export const RenderElementNode: NodeComponent = ({ node }) => {
  const [inputs] = useAtom(node.inputValues);

  return (
    <>
      {inputs
        .filter(
          (input) => typeof input === "object" && React.isValidElement(input)
        )
        .map((input) => (
          <g key={input.toString()}>{input}</g>
        ))}
    </>
  );
};

export default React.memo(RenderElementNode);
