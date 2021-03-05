import React from "react";
import { useAtom } from "jotai";
import type { NodeComponent } from "../../Node";

export const RenderComponentNode: NodeComponent = ({ node }) => {
  const [inputs] = useAtom(node.inputValues);

  return (
    <>
      {inputs
        .filter((i): i is React.FC => typeof i === "function")
        .map((Input) => (
          <Input />
        ))}
    </>
  );
};

export default React.memo(RenderComponentNode);
