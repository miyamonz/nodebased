import React from "react";
import { useAtom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import type { Node } from "./types";

type Props = {
  node: Node;
};
export const RenderElementNode: React.FC<Props> = ({ node }) => {
  const isocket = node.inputs[0];
  const [inputAtom] = useAtom(isocket.atom);
  const [input] = useAtom(inputAtom);

  const [rect] = useAtom(node.rect);
  return <>{React.isValidElement(input) && input}</>;
};

export default React.memo(RenderElementNode);
