import React from "react";
import { useAtom } from "jotai";
import type { NodeComponent } from "../../Node";

const isValidElement = (input: unknown): input is React.ReactElement =>
  typeof input === "object" && React.isValidElement(input);

export const RenderElementNode: NodeComponent = ({ node }) => {
  const [inputs] = useAtom(node.inputValues);

  return (
    <>
      {inputs.filter(isValidElement).map((input) => (
        <g key={input.toString()}>{input}</g>
      ))}
    </>
  );
};

export default React.memo(RenderElementNode);
